from app.models.stocks import Stock
from app.const import *

from fastapi import APIRouter
from app.schemes.stocks import GetAllStocks

router = APIRouter(prefix="/stock_back")


@router.post("/ticker-normalization", description="모든 종목 코드 형식 수정")
async def ticker_normalization():
    start = time.time()
    stocks = await Stock.all()
    for stock in stocks:
        stock.ticker = (6 - len(stock.ticker)) * '0' + stock.ticker
    await Stock.bulk_update(stocks, fields=('ticker',))
    end = time.time()
    print(start - end)
    return stocks


@router.get("/stock_list", description="모든 종목 리스트", response_model=GetAllStocks)
async def get_stock_list():
    stocks = await Stock.filter(id__gte=500).limit(100)
    return GetAllStocks(stocks=stocks)
