import time
import requests
from collections import defaultdict

from app.models.stocks import Stock
from app.const import *
from app.config import settings, redis_session

from fastapi import APIRouter, BackgroundTasks
import aiohttp
from pykrx import stock
from app.schemes.common import CommonResponse
from app.schemes.stocks import EntireStockData, GetAllStocks

router = APIRouter(prefix="/stock_back")


def parameter_setter(ticker: str, req_time: str):
    parameter["fid_input_iscd"] = ticker
    parameter["fid_input_hour_1"] = req_time
    return parameter


def get_auth_token(key, secret):
    url = settings.OPEN_API_DOMAIN+'/oauth2/tokenP'
    request_body = {
        "grant_type": "client_credentials",
        "appkey": key,
        "appsecret": secret
    }
    res = requests.post(url, json=request_body)
    res_code = res.status_code
    if res_code == 200:
        return res.json()["access_token"]
    else:
        print("Error Code : " + str(res_code) + " | " + res.text)
        return None


def save_access_token(token_use: str):
    now = time.time()
    # if now - redis_session.lindex(token_use, 1) > 43200:
    if True:
        res = get_auth_token(settings.APPKEY_FOR_CANDLE, settings.APPSECRET_FOR_CANDLE)
        redis_session.set(token_use, res)
        redis_session.expire(token_use, 43200)
    return CommonResponse()


@router.post("/ticker-normalization", description="모든 종목 코드 형식 수정")
async def ticker_normalization():
    start = time.time()
    stocks = await Stock.all()
    for stock in stocks:
        stock.ticker = (6 - len(stock.ticker)) * '0' + stock.ticker
        # await stock.save(update_fields=("ticker",))

    end = time.time()
    print(start-end)
    return stocks


@router.get("/stock_list", description="모든 종목 리스트", response_model=GetAllStocks)
async def get_stock_list():
    stocks = await Stock.filter(id__gte=500).limit(100)
    return GetAllStocks(stocks=stocks)


async def update_stock_back(req_time: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(update_stock_list, req_time)
    return CommonResponse()


async def update_stock_list(req_time: str):
    initial_start = time.time()
    access_token = redis_session.get("update_stock")
    header["authorization"] = "Bearer " + access_token
    category_dict = defaultdict(list)
    stocks = await Stock.all().values('id', 'ticker', 'name', 'category_id')
    async with aiohttp.ClientSession(headers=header) as session:
        for r in range(len(stocks)//15):
            start = time.time()
            for stock_d in stocks[15*r:15*(r+1)]:
                async with session.get(candle_url, params=parameter_setter(stock_d["ticker"], req_time)) as response:
                    data = await response.json()
                latest = data['output2'][0]
                res = candle_map[stock_d["category_id"]](
                    stock_id=stock_d["id"],
                    date=latest['stck_bsop_date'],
                    time=latest['stck_cntg_hour'],
                    price=latest['stck_prpr'],
                    volume=latest['cntg_vol'],
                    open_price=latest['stck_oprc'],
                    max_price=latest['stck_hgpr'],
                    min_price=latest['stck_lwpr'],
                )
                category_dict[stock_d["category_id"]].append(res)
            time.sleep(1)
            end = time.time()
            print(f'{min(15*(r+1), len(stocks))}개 {end-start}s')
    for category in category_dict.keys():
        await candle_map[category].bulk_create(category_dict[category])
    finished = time.time()
    print(f'{finished-initial_start}s 종료')
    return None


async def update_day_stock_back(background_tasks: BackgroundTasks):
    background_tasks.add_task(update_day_stock)
    return CommonResponse()


async def update_day_stock():
    stocks = await Stock.all().values('id', 'ticker', 'name', 'category_id')
    start = time.time()
    print("start")
    datas = []
    for stock_d in stocks:
        df = stock.get_market_ohlcv("20211102", "20221031", stock_d["ticker"], adjusted=False)
        new_df = df.to_dict()
        time.sleep(1)
        for k in new_df['시가'].keys():
            res = day_map[stock_d["category_id"]](
                stock_id=stock_d["id"],
                date=k.date(),
                close_price=new_df.get('종가')[k],
                volume=new_df.get('거래량')[k],
                open_price=new_df.get('시가')[k],
                max_price=new_df.get('고가')[k],
                min_price=new_df.get('저가')[k],
            )
            datas.append(res)
            await day_map[stock_d["category_id"]].bulk_create(datas)
            datas.clear()
        print(f'{len(datas)}')
        time.sleep(2)
    end = time.time()
    print(end-start)
    return None
