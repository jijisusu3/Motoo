import time
import requests
from datetime import date, timedelta
from collections import defaultdict
from app.models.stocks import Stock, Category
from app.const import *
from app.config import settings, redis_session
from pykrx import stock
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
