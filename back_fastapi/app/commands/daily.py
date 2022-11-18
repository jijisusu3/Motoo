import asyncio
from collections import defaultdict
from datetime import date, timedelta
import threading
import aiohttp
import typer
from pykrx import stock

from app.const import *
from app.models.stocks import Stock, Category

app = typer.Typer()


async def insert_daily_and_close_price():
    yesterday = (date.today() - timedelta(days=1)).strftime("%Y%m%d")
    today = date.today().strftime("%Y%m%d")
    ctgr_list = await Category.all().values('id')
    stocks = await Stock.all()
    start = time.time()
    print("start")
    ctgr_dict = defaultdict(list)
    for stck in stocks:
        df = stock.get_market_ohlcv(today, today, stck.ticker, adjusted=False)
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
        threading.Event().wait(0.2)
    for ctgr in range(1, len(ctgr_list) + 1):
        await day_map[ctgr].bulk_create(ctgr_dict[ctgr])
    await Stock.bulk_update(stocks, fields=('close_price',))
    end = time.time()
    print(end - start)


async def update_stock_info():
    yesterday = (date.today() - timedelta(days=1)).strftime("%Y%m%d")
    today = date.today().strftime("%Y%m%d")
    print('시작')
    initial_start = time.time()
    access_token = redis_session.get("update_stock")
    if access_token is None:
        save_token()
        access_token = redis_session.get("update_stock")
    header = get_header('FHKST01010100')
    header["authorization"] = "Bearer " + access_token
    df = stock.get_market_ohlcv(today)
    tickers = df.index.values
    stocks = []
    new_stocks = []
    async with aiohttp.ClientSession(headers=header) as session:
        for r in range(1 + len(tickers) // 20):
            start = time.time()
            for tckr in tickers[20 * r:20 * (r + 1)]:
                async with session.get(price_url, params=parameter_setter(tckr)) as response:
                    data = await response.json()
                if data["rt_cd"] == 1:
                    threading.Event().wait(1)
                    async with session.get(price_url, params=parameter_setter(tckr)) as response:
                        data = await response.json()
                flag = 0
                stck = await Stock.get_or_none(ticker=tckr)
                if stck is None:
                    flag = 1
                    info = df.loc[tckr]
                    ctgr = await Category.filter(
                        name__contains=data['output']["bstp_kor_isnm"][:2]
                    ).filter(
                        name__contains=data['output']["bstp_kor_isnm"][-2:]
                    )
                    stck = Stock(
                        ticker=tckr,
                        category_id=ctgr[0].pk,
                        name=f'{tckr}_noname',
                        open_price=int(info['시가']),
                        close_price=int(info['종가']),
                        volume=int(info['거래량']),
                        fluctuation_rate=info['등락률'],
                        keyword=[1],
                        sentiment=[0, 0, 0],
                        price=100
                    )
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
                stck.m_capital = data['output']['hts_avls']
                if flag == 0:
                    stocks.append(stck)
                else:
                    new_stocks.append(stck)
            check_end = time.time()
            end_s = time.time()
            threading.Event().wait(min(abs(1.1 - end_s + start), 1.05))
            end_t = time.time()
            print(f'{min(20 * (r + 1), len(stocks))}개 {end_t - start}s')
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
                'm_capital',
                )
    )
    await Stock.bulk_create(new_stocks)
    finished = time.time()
    print(f'{finished - initial_start}s 종료')
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
def get_any(any_word: str):
    print(redis_session.get(any_word))


if __name__ == "__main__":
    app()
