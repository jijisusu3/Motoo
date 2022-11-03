import time
import requests
import datetime
from datetime import date, timedelta
from collections import defaultdict
from app.models.stocks import Stock, Category
from app.const import *
from app.config import settings, redis_session
from pykrx import stock
import aiohttp
import asyncio
import typer


app = typer.Typer()


async def insert_daily():
    yesterday = (date.today()-timedelta(days=1)).strftime("%Y%m%d")
    ctgr_list = await Category.all().values('id')
    stocks = await Stock.all().values('id', 'ticker', 'name', 'category_id')
    start = time.time()
    print("start")
    ctgr_dict = defaultdict(list)
    for stock_d in stocks:
        df = stock.get_market_ohlcv(yesterday, yesterday, stock_d["ticker"], adjusted=False)
        new_df = df.to_dict()
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
            ctgr_dict[stock_d["category_id"]].append(res)
        time.sleep(0.2)
    for ctgr in range(1, len(ctgr_list)+1):
        await day_map[ctgr].bulk_create(ctgr_dict[ctgr])
    end = time.time()
    print(end-start)


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


async def update_stock_list(update_time: str = None):
    input_time = datetime.datetime.now().strftime('%H%M%S')
    if update_time:
        input_time = update_time
    print('시작')
    initial_start = time.time()
    access_token = redis_session.get("update_stock")
    header["authorization"] = "Bearer " + access_token
    category_dict = defaultdict(list)
    stocks = await Stock.all()
    async with aiohttp.ClientSession(headers=header) as session:
        for r in range(len(stocks)//20):
            start = time.time()
            for stck in stocks[20*r:20*(r+1)]:
                async with session.get(candle_url, params=parameter_setter(stck.ticker, input_time)) as response:
                    data = await response.json()
                latest = data['output2'][0]
                stck.price = data['output1']['stck_prpr']
                stck.fluctuation_rate = data['output1']['prdy_ctrt']
                stck.fluctuation_price = data['output1']['prdy_vrss']
                stck.trading_value = data['output1']['acml_tr_pbmn']
                stck.volume = data['output1']['acml_vol']
            check_end = time.time()
            time.sleep(1.07-check_end+start)
            end_s = time.time()
            print(f'{min(20*(r+1), len(stocks))}개 {end_s-start}s')
    if update_time:
        for category in category_dict.keys():
            await candle_map[category].bulk_create(category_dict[category])
    await Stock.bulk_update(stocks, fields=('price', 'fluctuation_rate', 'fluctuation_price', 'trading_value', 'volume',))
    finished = time.time()
    print(f'{finished-initial_start}s 종료')
    return None


@app.command()
def new_daily():
    asyncio.run(insert_daily())


@app.command()
def save_token(token_use: str = 'update_stock'):
    res = get_auth_token(settings.APPKEY_FOR_CANDLE, settings.APPSECRET_FOR_CANDLE)
    if res is not None:
        redis_session.set(token_use, res, ex=43200)
        print('save_token complete!')


@app.command()
def save_any(any_word: str):
    redis_session.set(any_word, 'success')
    print('saved!')


@app.command()
def get_any(any_word: str):
    print(redis_session.get(any_word))


if __name__ == "__main__":
    app()
