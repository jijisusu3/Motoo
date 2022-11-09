import datetime
from datetime import date, timedelta
from collections import defaultdict
import tortoise
from fastapi import APIRouter, Response, Depends, WebSocket, WebSocketDisconnect

from app.config import manager
from app.const import *
from app.models.accounts import Trading, Account
from app.models.stocks import Stock
from app.models.users import User, School
from app.routers.authentication import get_current_user
from app.schemes.common import CommonResponse
from app.schemes.stocks import GetStockDetailResponse, GetShortStockResponse, BidAskResponse, SchoolHotStockResponse

router = APIRouter(prefix="/stocks")


@router.get("/detail/{ticker}",
            description="주식 상세 조회",
            response_model=GetStockDetailResponse)
async def get_stock_detail(ticker: str, response: Response):
    try:
        stock = await Stock.get(ticker=ticker).select_related('keywords').select_related('category')
        keywords = await stock.keywords
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return GetStockDetailResponse(message="failed")
    today = date.today().strftime("%Y-%m-%d")
    # 차트 데이터
    daily = await candle_map[stock.category_id].filter(stock_id=stock.pk, date=today)
    weekly = (await candle_map[stock.category_id].filter(
        stock_id=stock.pk,
        date__gte=date.today()-timedelta(7)
    ).order_by('-id'))[::6][::-1]
    monthly = await day_map[stock.category_id].filter(stock_id=stock.pk, date__gte=date.today()-timedelta(31))
    yearly = (await day_map[stock.category_id].filter(
        stock_id=stock.pk,
        date__gte=date.today()-timedelta(365)
    ).order_by('-id'))[::5][::-1]
    return GetStockDetailResponse(**dict(stock),
                                  category_name=stock.category.name,
                                  daily=daily,
                                  weekly=weekly,
                                  monthly=monthly,
                                  yearly=yearly,
                                  daily_min=min(daily, key=lambda x: x.min_price),
                                  daily_max=max(daily, key=lambda x: x.max_price),
                                  weekly_min=min(weekly, key=lambda x: x.min_price),
                                  weekly_max=max(weekly, key=lambda x: x.max_price),
                                  monthly_min=min(monthly, key=lambda x: x.min_price),
                                  monthly_max=max(monthly, key=lambda x: x.max_price),
                                  yearly_min=min(yearly, key=lambda x: x.min_price),
                                  yearly_max=max(yearly, key=lambda x: x.max_price),
                                  keyword=keywords.keyword if keywords else None,
                                  sentiment=keywords.sentiment if keywords else None,
                                  )


@router.get("/short/{ticker}", description="주식 간단 조회",
            response_model=GetShortStockResponse)
async def get_stock_short(ticker: str, response: Response):
    try:
        stock = await Stock.get(ticker=ticker)
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return GetStockDetailResponse(message="failed")
    today = date.today().strftime("%Y-%m-%d")
    # 차트 데이터
    daily = await candle_map[stock.category_id].filter(stock_id=stock.pk, date=today)
    return GetShortStockResponse(**dict(stock),
                                 daily=daily,
                                 daily_min=min(daily, key=lambda x: x.min_price),
                                 daily_max=max(daily, key=lambda x: x.max_price))


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


@router.get("/school-hot", description="교내 핫 종목", response_model=SchoolHotStockResponse)
async def get_school_hot_list(response: Response, user: User = Depends(get_current_user)):
    try:
        users_in_school = await User.filter(school_id=user.school_id).values_list('id', flat=True)
        accounts = await Account.filter(school=True, user_id__in=users_in_school).values_list('id', flat=True)
        not_finished = await Trading.filter(tr_date__isnull=True, account_id__in=accounts)
        finished = await Trading.filter(tr_date__gte=datetime.datetime.today()-datetime.timedelta(7),
                                        account_id__in=accounts)
        tr_amounts = defaultdict(int)
        for tr_yet in not_finished:
            tr_amounts[tr_yet.ticker] += int(tr_yet.tr_amount)
        for trd in finished:
            tr_amounts[trd] += int(trd.tr_amount)
        hot_item = None
        if tr_amounts.values():
            hot_item = max(tr_amounts, key=tr_amounts.get)
        hot_stock = await Stock.get(ticker=hot_item)
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return SchoolHotStockResponse(message="failed")
    return SchoolHotStockResponse(stock_id=hot_stock.pk, stock_name=hot_stock.name, stock_ticker=hot_stock.ticker)
