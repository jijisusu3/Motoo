# import threading
# import Schedule
import datetime
import requests
import aiohttp
import asyncio
from httpx import AsyncClient
import time
API_KEY_FOR_CANDLE=...
candle_url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice"
appkey = " PSbnQwiUVjSDrKpKhNTFlBROfir5eDge5mAm"
appsecret = "JNJtaSfSmVypQARem1fCeM6XVP0aqxWA7hfbspryHlngj6nTRgV97eYhAUjtreet1O7oHNMz20Ia3h6komEuHvqe3dcO6korBsUfl5+PViswjiwdpDqHLoS0LxP1MWFe0XQmEM5h61T6+Xx17grpxmy6eOo91clDn/aC1XaNPsvi7MrbAyc="
header = {
    "content-type": "application/json; charset=utf-8",
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImM2NTU4NDgyLTQzZWMtNGUwOC04YmI1LTYzMWQ3YzEzYjhmMSIsImlzcyI6InVub2d3IiwiZXhwIjoxNjY2OTQ2MDk5LCJpYXQiOjE2NjY4NTk2OTksImp0aSI6IlBTOEpScHdQUjkwTVVVR0k1b2s4em14dGxMYVE4bHFZTlpVTCJ9.A-ZEIVXczJ_95WMQiW2mRoNhlhe6tRKIKp7dShFYj4EU3wSR0UutA-Q9xO9kUXrtKthfjUbsStpvZcJH5RgJkg",
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
    "95570",
    "6840",
    "27410",
    "282330",
    "138930",
    "1460",
    "1465",
    "1040",
    "79160",
    "00104K",
    "120",
    "11150",
    "11155",
    "1045",
    "97950"
]


def parameter_setter(ticker: str):
    parameter["fid_input_iscd"] = ticker
    return parameter


def get_auth_token():
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
                result.append(data)
    end = time.time()
    print(f"{end - start:.5f} sec")
    return result

r = update_stock(await)
# asyncio.run(update_stock(), debug=True)