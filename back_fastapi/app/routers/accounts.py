import datetime
from datetime import date, timedelta
from collections import defaultdict
import tortoise
from fastapi import APIRouter, Response, Depends
from app.const import *
from app.models.accounts import Trading, Account
from app.models.stocks import Stock
from app.models.users import User
from app.routers.authentication import get_current_user
from app.schemes.accounts import CheckAccountStockResponse, AccountStockInfo

router = APIRouter(prefix="/account")


@router.get("/check/{account_id}/{user_id}",
            description="해당 계좌의 보유한 주식, 보유량 조회",
            response_model=CheckAccountStockResponse)
# async def check_account_stock(account_id: int, response: Response = 200, user: User = Depends(get_current_user)):
async def check_account_stock(account_id: int, user_id: int, response: Response = 200):
    response.status_code = 200
    try:
        user = await User.get(id=user_id)
        account = await Account.get(id=account_id, user_id=user.pk)
        account_stocks = await account.account_stock
        selling = await Trading.filter(account_id=account_id, user_id=user_id, tr_type=3)
        buying = await Trading.filter(account_id=account_id, user_id=user_id, tr_type=4)
        acc_stck_map = dict()
        seed = account.seed
        for ac_st in account_stocks:
            ac_ticker = (await Stock.get(id=ac_st.stock_id)).ticker
            acc_stck_map[ac_ticker] = AccountStockInfo(stockId=ac_st.stock_id,
                                                       ticker=ac_ticker,
                                                       amount=ac_st.amount,
                                                       available=ac_st.amount)
        for sell in selling:
            acc_stck_map[sell.ticker].available -= sell.tr_amount
        for buy in buying:
            seed -= buy.tr_price * buy.tr_amount
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return CheckAccountStockResponse(message="failed")
    return CheckAccountStockResponse(
        message="보유주식 리스트 조회에 성공하였습니다.",
        **dict(account),
        availableSeed=seed,
        statusCode=response.status_code,
        stockInfo=list(acc_stck_map.values())
    )