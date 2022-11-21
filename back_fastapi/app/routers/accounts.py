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


@router.get("/check/{account_id}",
            description="해당 계좌의 보유한 주식, 보유량 조회",
            response_model=CheckAccountStockResponse)
async def check_account_stock(account_id: int, user: User = Depends(get_current_user), response: Response = 200):
    response.status_code = 200
    try:
        account = await Account.get(id=account_id, user_id=user.pk)
        seed = account.seed
        account_stocks = await account.account_stock
        selling = await Trading.filter(account_id=account_id, user_id=user.pk, tr_type=3)
        buying = await Trading.filter(account_id=account_id, user_id=user.pk, tr_type=4)
        acc_stck_map = dict()
        for ac_st in account_stocks:
            ac_ticker = (await Stock.get(id=ac_st.stock_id)).ticker
            acc_stck_map[ac_ticker] = AccountStockInfo(stockId=ac_st.stock_id,
                                                       ticker=ac_ticker,
                                                       amount=ac_st.amount,
                                                       available=ac_st.amount)
        for sell in selling:
            if acc_stck_map.get(sell.ticker) is not None:
                acc_stck_map.get(sell.ticker).available -= sell.tr_amount
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