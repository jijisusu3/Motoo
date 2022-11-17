import asyncio
import datetime
from collections import defaultdict
import threading
import aiohttp
import typer

from app.const import *
from app.models.stocks import Stock

app = typer.Typer()


def check_time_interval(my_date, my_time, obj):
    if my_date == obj['stck_bsop_date'] and abs(my_time - int(obj['stck_cntg_hour'])) < 10:
        return True
    return False


async def update_and_insert_stock_list(update_time: str = None):
    input_time = datetime.datetime.now().strftime('%H%M%S')
    print(update_time)
    if update_time is not None:
        input_time = update_time
    print('시작')
    initial_start = time.time()
    access_token = redis_session.get("update_stock")
    if access_token is None:
        save_token()
        access_token = redis_session.get("update_stock")
    header = get_header("FHKST03010200")
    header["authorization"] = "Bearer " + access_token
    category_dict = defaultdict(list)
    stocks = await Stock.all()
    async with aiohttp.ClientSession(headers=header) as session:
        for r in range(1 + len(stocks) // 20):
            start = time.time()
            for stck in stocks[20 * r:20 * (r + 1)]:
                try:
                    async with session.get(candle_url, params=parameter_setter(stck.ticker, input_time)) as response:
                        data = await response.json()
                    latest = data['output2'][0]
                except KeyError:
                    threading.Event().wait(1)
                    async with session.get(candle_url, params=parameter_setter(stck.ticker, input_time)) as response:
                        data = await response.json()
                    latest = data['output2'][0]
                items = list(filter(
                    lambda x: check_time_interval(latest['stck_bsop_date'], int(latest['stck_cntg_hour']), x),
                    data['output2']
                ))
                if update_time is not None:
                    res = candle_map[stck.category_id](
                        stock_id=stck.pk,
                        date=latest['stck_bsop_date'],
                        time=latest['stck_cntg_hour'],
                        price=latest['stck_prpr'],
                        volume=sum([int(item['cntg_vol']) for item in items]),
                        open_price=latest['stck_oprc'],
                        max_price=max([int(item['stck_hgpr']) for item in items]),
                        min_price=min([int(item['stck_lwpr']) for item in items]),
                    )
                    category_dict[stck.category_id].append(res)
                stck.name = data['output1']['hts_kor_isnm']
                stck.price = data['output1']['stck_prpr']
                stck.fluctuation_rate = data['output1']['prdy_ctrt']
                stck.fluctuation_price = data['output1']['prdy_vrss']
                stck.trading_value = data['output1']['acml_tr_pbmn']
                stck.volume = data['output1']['acml_vol']
            end_s = time.time()
            threading.Event().wait(min(abs(1.1 - end_s + start), 1.05))
            end_t = time.time()
            print(f'{min(20 * (r + 1), len(stocks))}개 {end_t - start}s')
    if update_time is not None:
        print('update')
        for category in category_dict.keys():
            await candle_map[category].bulk_create(category_dict[category])
    await Stock.bulk_update(
        stocks,
        fields=('name', 'price', 'fluctuation_rate', 'fluctuation_price', 'trading_value', 'volume',)
    )
    finished = time.time()
    print(f'{finished - initial_start}s 종료')
    redis_session.set("updated", 1, ex=2)
    return None


@app.command()
def update_stocks(time_now: str = None):
    asyncio.run(update_and_insert_stock_list(time_now))


@app.command()
def update_stocks_with_time():
    input_time = datetime.datetime.now().strftime('%H%M00')
    asyncio.run(update_and_insert_stock_list(input_time))


if __name__ == "__main__":
    app()
