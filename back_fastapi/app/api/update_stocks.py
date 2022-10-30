# import threading
# import Schedule
import datetime
from typing import TypeVar
from app.config import settings
import requests
import aiohttp
import asyncio
from httpx import AsyncClient
import time
API_KEY_FOR_CANDLE=...

candle_url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice"
appkey = "PSbnQwiUVjSDrKpKhNTFlBROfir5eDge5mAm"
appsecret="JNJtaSfSmVypQARem1fCeM6XVP0aqxWA7hfbspryHlngj6nTRgV97eYhAUjtreet1O7oHNMz20Ia3h6komEuHvqe3dcO6korBsUfl5+PViswjiwdpDqHLoS0LxP1MWFe0XQmEM5h61T6+Xx17grpxmy6eOo91clDn/aC1XaNPsvi7MrbAyc="

header = {
    "content-type": "application/json; charset=utf-8",
    "authorization": "Bearer "+"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjA0N2E4MzYxLWRjZTQtNGU2Yy05YjAyLWYxYzhmNWEwNTg4YSIsImlzcyI6InVub2d3IiwiZXhwIjoxNjY2OTczNjUwLCJpYXQiOjE2NjY4ODcyNTAsImp0aSI6IlBTYm5Rd2lVVmpTRHJLcEtoTlRGbEJST2ZpcjVlRGdlNW1BbSJ9.RaisQ8Tnxx69JUAEiXEN_kaSK74mIJP2mPu52jvROaPpmUByPNRVcqlukPkH46WYPAfimpb0mvoIegosGK1lAg",
    "appkey": appkey,
    "appsecret": appsecret,
    "tr_id": "FHKST03010200",
    "custtype": "P"
}
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
