from datetime import date, timedelta

import tortoise
from fastapi import APIRouter, Response, WebSocket, WebSocketDisconnect

from app.config import manager
from app.const import *
from app.models.stocks import Stock
from app.schemes.stocks import GetStockDetailResponse, GetShortStockResponse, BidAskResponse

router = APIRouter(prefix="/stocks")


@router.get("/detail/{ticker}",
            description="주식 상세 조회",
            response_model=GetStockDetailResponse,
            response_model_exclude_none=True)
async def get_stock_detail(ticker: str, response: Response):
    try:
        stock = await Stock.get(ticker=ticker)
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return GetStockDetailResponse(message="failed")
    today = date.today().strftime("%Y-%m-%d")
    # 차트 데이터
    daily = await candle_map[stock.category_id].filter(stock=stock.pk, date=today)
    weekly = (await candle_map[stock.category_id].filter(
        stock=stock.pk,
        date__gte=date.today()-timedelta(7)
    ).order_by('-id'))[::6][::-1]
    monthly = await day_map[stock.category_id].filter(stock=stock.pk, date__gte=date.today()-timedelta(31))
    yearly = (await day_map[stock.category_id].filter(
        stock=stock.pk,
        date__gte=date.today()-timedelta(365)
    ).order_by('-id'))[::5][::-1]
    return GetStockDetailResponse(**dict(stock), daily=daily, weekly=weekly, monthly=monthly, yearly=yearly)


@router.get("/short/{ticker}", description="주식 간단 조회",
            response_model=GetShortStockResponse,
            response_model_exclude_none=True,
            response_model_exclude={'name', 'id', 'ticker'})
async def get_stock_detail(ticker: str, response: Response):
    try:
        stock = await Stock.get(ticker=ticker)
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return GetStockDetailResponse(message="failed")
    today = date.today().strftime("%Y-%m-%d")
    # 차트 데이터
    daily = await candle_map[stock.category_id].filter(stock=stock.pk, date=today)
    return GetShortStockResponse(**dict(stock), daily=daily)


@router.get("/bidask/{ticker}", description="매수매도호가 조회", response_model=BidAskResponse)
async def get_bidask_list(ticker: str):
    bid = redis_session.lrange('bid' + ticker, 0, 9)
    ask = redis_session.lrange('ask' + ticker, 0, 9)
    access_token = redis_session.get("get_bidask")
    if access_token is None:
        save_token()
        access_token = redis_session.get("get_bidask")
    header = get_header('FHKST01010200', False, settings.APPKEY_FOR_BIDASK, settings.APPSECRET_FOR_BIDASK)
    header["authorization"] = "Bearer " + access_token
    if not bid or not ask:
        res = requests.get(
            url=settings.OPEN_API_DOMAIN + settings.BIDASK_API_URL,
            headers=header,
            params=parameter_setter(ticker=ticker)
        )
        if res.status_code == 200:
            data = res.json()['output1']
            for i in range(1, 11):
                redis_session.rpush('ask'+ticker, data[f'askp{i}'])
                redis_session.rpush('bid'+ticker, data[f'bidp{i}'])
                redis_session.expire('ask'+ticker,60)
                redis_session.expire('bid' + ticker, 60)
            bid = sorted(redis_session.lrange('bid' + ticker, 0, 9), reverse=True)[:5]
            ask = sorted(redis_session.lrange('ask' + ticker, 0, 9))[:5]
    return BidAskResponse(bid=bid, ask=ask)
