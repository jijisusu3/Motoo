import datetime
import time
import requests
from collections import defaultdict

from app.models.stocks import Stock
from app.routers.const import *
from app.config import settings, redis_session

from fastapi import APIRouter, BackgroundTasks
import aiohttp
import pykrx
import asyncio
import typer
from app.schemes.common import CommonResponse
from app.schemes.stocks import CandleData

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


@router.post("/save_token", description="access token 저장", response_model=CommonResponse)
def save_access_token(token_use: str):
    now = time.time()
    # if now - redis_session.lindex(token_use, 1) > 43200:
    if True:
        res = get_auth_token(settings.APPKEY_FOR_CANDLE, settings.APPSECRET_FOR_CANDLE)
        redis_session.rpush(token_use, res, now)
        redis_session.expire(token_use, 43200)
    return CommonResponse()


@router.post("/regular_tickers", description="모든 종목 코드 형식 수정")
async def regular_tickers(background: BackgroundTasks):
    start = time.time()
    stocks = await Stock.all()
    for stock in stocks:
        stock.ticker = (6 - len(stock.ticker)) * '0' + stock.ticker
        await stock.save(update_fields=("ticker",))
    end = time.time()
    print(start-end)
    return stocks


@router.get("/stock_list", description="모든 종목 리스트")
async def get_stock_list(background: BackgroundTasks):
    stocks = await Stock.all()
    return stocks


@router.post("/stock_list", description="모든 종목 리스트", response_model=CommonResponse)
async def update_stock_back(req_time: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(update_stock_list, req_time)
    return CommonResponse()


async def update_stock_list(req_time: str):
    initial_start = time.time()
    access_token = redis_session.lindex("update_stock", 0)
    header["authorization"] = "Bearer " + access_token
    category_dict = defaultdict(list)
    stocks = await Stock.all().values('id', 'ticker', 'name', 'category_id')
    async with aiohttp.ClientSession(headers=header) as session:
        for r in range(len(stocks)//15):
            start = time.time()
            for stock in stocks[15*r:15*(r+1)]:
                async with session.get(candle_url, params=parameter_setter(stock["ticker"], req_time)) as response:
                    data = await response.json()
                latest = data['output2'][0]
                res = candle_map[stock["category_id"]](
                    stock_id=stock["id"],
                    date=latest['stck_bsop_date'],
                    time=latest['stck_cntg_hour'],
                    price=latest['stck_prpr'],
                    volume=latest['cntg_vol'],
                    open_price=latest['stck_oprc'],
                    max_price=latest['stck_hgpr'],
                    min_price=latest['stck_lwpr'],
                )
                category_dict[stock["category_id"]].append(res)
            time.sleep(1)
            end = time.time()
            print(f'{min(15*(r+1), len(stocks))}개 {end-start}s')
    for category in category_dict.keys():
        await candle_map[category].bulk_create(category_dict[category])
    finished = time.time()
    print(f'{finished-initial_start}s 종료')
    return None
