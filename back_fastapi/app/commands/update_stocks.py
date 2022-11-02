# import threading
# import Schedule
from datetime import datetime, date
import requests
import aiohttp
import asyncio
from httpx import AsyncClient
import time
from pykrx import stock
from pykrx import bond
# header = {
#     "content-type": "application/json; charset=utf-8",
#     "authorization": "Bearer ",
#     "appkey": appkey,
#     "appsecret": appsecret,
#     "tr_id": "FHKST03010200",
#     "custtype": "P"
# }
parameter = {
    "fid_cond_mrkt_div_code": "J",
    "fid_etc_cls_code": "",
    "fid_input_hour_1": "100000",
    "fid_input_iscd": "000660",
    "fid_pw_data_incu_yn": "Y"
}

tickers = [
    "207940",
    "003240",
    "006400",
    "000670",
    "010130",
    "051910",
    "051900",
    "373220",
    "007310",
    "097950",
    "036570",
    "001460",
    "003920",
    "017390",
    "298050",
]

def parameter_setter(ticker: str):
    parameter["fid_input_iscd"] = ticker
    return parameter


def get_auth_token():
    global appkey, appsecret
    url = 'https://openapi.koreainvestment.com:9443/oauth2/tokenP'
    request_body = {
        "grant_type": "client_credentials",
        "appkey": appkey,
        "appsecret": appsecret
    }
    res = requests.post(url, json=request_body)

    rescode = res.status_code
    if rescode == 200:
        print(res.json())
        print(res.json()["access_token"])
    else:
        print("Error Code : " + str(rescode) + " | " + res.text)


async def update_stock(
        # stock_id: int, ticker: str
):
    global candle_url, header, parameter

    result = []
    for t_id in range(len(tickers)):
        tickers[t_id] = (6-len(tickers[t_id]))*'0'+tickers[t_id]
    start = time.time()
    async with aiohttp.ClientSession(headers=header) as session:
        for ticker in tickers:
            async with session.get(candle_url, params=parameter_setter(ticker)) as response:
                data = await response.json()
            result.append([data["output2"][0],ticker])
    end = time.time()
    print(f"{end - start:.5f} sec")
    print(result)
    return result


async def update_single_stock(ticker: str):
    global candle_url, header, parameter
    start = time.time()
    async with aiohttp.ClientSession(headers=header) as session:
        async with await session.get(candle_url, params=parameter_setter(ticker)) as response:
            data = await response.json()
    end = time.time()
    print(f"{end - start:.5f} sec")
    return data

df = stock.get_market_ohlcv("20221101","20221101","005930", adjusted=False)
new_d = df.to_dict()
print(new_d)
print(len(new_d.keys()))
res = []
for k in new_d['시가'].keys():
    res.append(
        {
            'date': k.date(),
            'volume': new_d.get('거래량')[k],
            'open_price': new_d.get('시가')[k],
            'close_price': new_d.get('종가')[k],
            'min_price': new_d.get('저가')[k],
            'max_price': new_d.get('고가')[k],
        }
    )


