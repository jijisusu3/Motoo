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


async def insert_daily_and_close_price():
    yesterday = (date.today()-timedelta(days=1)).strftime("%Y%m%d")
    ctgr_list = await Category.all().values('id')
    stocks = await Stock.all()
    start = time.time()
    print("start")
    ctgr_dict = defaultdict(list)
    for stck in stocks:
        df = stock.get_market_ohlcv(yesterday, yesterday, stck.ticker, adjusted=False)
        new_df = df.to_dict()
        for k in new_df['시가'].keys():
            res = day_map[stck.category_id](
                stock_id=stck.pk,
                date=k.date(),
                close_price=new_df.get('종가')[k],
                volume=new_df.get('거래량')[k],
                open_price=new_df.get('시가')[k],
                max_price=new_df.get('고가')[k],
                min_price=new_df.get('저가')[k],
            )
            ctgr_dict[stck.category_id].append(res)
            stck.close_price = new_df.get('종가')[k]
        time.sleep(0.2)
    for ctgr in range(1, len(ctgr_list)+1):
        await day_map[ctgr].bulk_create(ctgr_dict[ctgr])
    await Stock.bulk_update(stocks, fields=('close_price',))
    end = time.time()
    print(end-start)


async def update_stock_info():
    print('시작')
    initial_start = time.time()
    access_token = redis_session.get("update_stock")
    if access_token is None:
        save_token()
        access_token = redis_session.get("update_stock")
    header["authorization"] = "Bearer " + access_token
    stocks = await Stock.all()
    async with aiohttp.ClientSession(headers=get_header('FHKST01010100')) as session:
        for r in range(len(stocks)//20):
            start = time.time()
            for stck in stocks[20*r:20*(r+1)]:
                async with session.get(price_url, params=parameter_setter(stck.ticker)) as response:
                    data = await response.json()
                stck.price = data['output']['stck_prpr']
                stck.fluctuation_rate = data['output']['prdy_ctrt']
                stck.fluctuation_price = data['output']['prdy_vrss']
                stck.trading_value = data['output']['acml_tr_pbmn']
                stck.volume = data['output']['acml_vol']
                stck.per = data['output']['per']
                stck.eps = data['output']['eps']
                stck.open_price = data['output']['stck_oprc']
                stck.maximum = data['output']['stck_mxpr']
                stck.minimum = data['output']['stck_llam']
                stck.capital = data['output']['cpfn']
                stck.m_capital = data['output']['hts_avls']
            check_end = time.time()
            time.sleep(0.75)
            end_s = time.time()
            print(f'{min(20*(r+1), len(stocks))}개 {end_s-start}s')
    await Stock.bulk_update(
        stocks,
        fields=('price',
                'fluctuation_rate',
                'fluctuation_price',
                'trading_value',
                'volume',
                'open_price',
                'per',
                'eps',
                'maximum',
                'minimum',
                'capital',
                'm_capital',
                )
    )
    finished = time.time()
    print(f'{finished-initial_start}s 종료')
    return None


@app.command()
def update_stock_detail():
    asyncio.run(update_stock_info())


@app.command()
def daily_insert():
    asyncio.run(insert_daily_and_close_price())


@app.command()
def get_token(token_use: str = 'update_stock'):
    save_token(token_use)


@app.command()
def save_any(any_word: str):
    redis_session.set(any_word, 'success')
    print('saved!')


@app.command()
def get_any(any_word: str):
    print(redis_session.get(any_word))


if __name__ == "__main__":
    app()
