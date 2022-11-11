import time

import requests

from app.config import settings, redis_session
from app.models.candles import *
from app.models.daycharts import *

price_url = settings.OPEN_API_DOMAIN + settings.PRICE_API_URL
candle_url = settings.OPEN_API_DOMAIN + settings.CANDLE_API_URL
appkey = settings.APPKEY_FOR_CANDLE
appsecret = settings.APPSECRET_FOR_CANDLE
tr_id_candle = settings.TRADE_ID_FOR_CANDLE

parameter = {
    "fid_cond_mrkt_div_code": "J",
}
candle_map = {
    1: CandleConstruction,
    2: CandleFinance,
    3: CandleMechanic,
    4: CandleManufacturing,
    5: CandleAgriculture,
    6: CandleInsurance,
    7: CandleNonmetal,
    8: CandleService,
    9: CandleFiber,
    10: CandleTransportEquip,
    11: CandleTransportDepot,
    12: CandleDistribution,
    13: CandleBank,
    14: CandleFood,
    15: CandleMedicalPrecision,
    16: CandleMedication,
    17: CandleElecGas,
    18: CandleElectronic,
    19: CandleWood,
    20: CandleStockIndustry,
    21: CandleSteel,
    22: CandleTelecommunication,
    23: CandleChemistry
}
day_map = {
    1: DayConstruction,
    2: DayFinance,
    3: DayMechanic,
    4: DayManufacturing,
    5: DayAgriculture,
    6: DayInsurance,
    7: DayNonmetal,
    8: DayService,
    9: DayFiber,
    10: DayTransportEquip,
    11: DayTransportDepot,
    12: DayDistribution,
    13: DayBank,
    14: DayFood,
    15: DayMedicalPrecision,
    16: DayMedication,
    17: DayElecGas,
    18: DayElectronic,
    19: DayWood,
    20: DayStockIndustry,
    21: DaySteel,
    22: DayTelecommunication,
    23: DayChemistry
}


def parameter_setter(ticker: str = None, req_time: str = None):
    if ticker:
        parameter["fid_input_iscd"] = ticker
    if req_time:
        parameter["fid_input_hour_1"] = req_time
        parameter["fid_etc_cls_code"] = ""
        parameter["fid_input_hour_1"] = ""
        parameter["fid_pw_data_incu_yn"] = "Y"
    return parameter


def get_header(
        tr_id: str = 'FHKST01010100',
        is_content: bool = True,
        app_key: str = appkey,
        app_secret: str = appsecret
):
    header = {"authorization": "", "appkey": app_key, "appsecret": app_secret, "tr_id": tr_id, "custtype": "P"}
    if is_content:
        header["content-type"] = "application/json; charset=utf-8"
    return header


def get_auth_token(key, secret):
    url = settings.OPEN_API_DOMAIN + '/oauth2/tokenP'
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


def save_token(token_use: str = 'update_stock'):
    res = None
    if token_use == 'update_stock':
        res = get_auth_token(settings.APPKEY_FOR_CANDLE, settings.APPSECRET_FOR_CANDLE)
    elif token_use == 'get_bidask':
        res = get_auth_token(settings.APPKEY_FOR_BIDASK, settings.APPSECRET_FOR_BIDASK)
    if res is not None:
        redis_session.set(token_use, res, ex=43200)
        print('save_token complete!')
        time.sleep(1)
