import time
from datetime import date, timedelta
from collections import defaultdict
from app.models.stocks import Stock, Category
from app.const import *
from app.config import settings, redis_session
import asyncio
import aiohttp
import typer


app = typer.Typer()


def parameter_setter(ticker: str, req_time: str):
    parameter["fid_input_iscd"] = ticker
    parameter["fid_input_hour_1"] = req_time
    return parameter


async def update_stock_list(req_time: str):
    initial_start = time.time()
    access_token = redis_session.lindex("update_stock", 0)
    header["authorization"] = "Bearer " + access_token
    category_dict = defaultdict(list)
    stocks = await Stock.all()
    async with aiohttp.ClientSession(headers=header) as session:
        for r in range(len(stocks)//15):
            start = time.time()
            for stck in stocks[15*r:15*(r+1)]:
                async with session.get(candle_url, params=parameter_setter(stck["ticker"], req_time)) as response:
                    data = await response.json()
                latest = data['output2'][0]
                stock_i = stocks[stck['id']-1]
                stock_i.update_from_dict()
                if req_time:
                    res = candle_map[stck["category_id"]](
                        stock_id=stck["id"],
                        date=latest['stck_bsop_date'],
                        time=latest['stck_cntg_hour'],
                        price=latest['stck_prpr'],
                        volume=latest['cntg_vol'],
                        open_price=latest['stck_oprc'],
                        max_price=latest['stck_hgpr'],
                        min_price=latest['stck_lwpr'],
                    )
                    category_dict[stck["category_id"]].append(res)
            time.sleep(0.8)
            end = time.time()
            print(f'{min(15*(r+1), len(stocks))}개 {end-start}s')
    for category in category_dict.keys():
        await candle_map[category].bulk_create(category_dict[category])
    finished = time.time()
    print(f'{finished-initial_start}s 종료')


if __name__ == "__main__":
    app()
