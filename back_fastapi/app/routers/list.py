import tortoise
from app.models.users import User
from app.models.stocks import Stock

from fastapi import APIRouter, Response
from app.schemes.lists import GetFavoriteStockListResponse, GetTopStockListResponse
router = APIRouter(prefix="/list")


@router.get("/top", description="실시간 종목 리스트", response_model=GetTopStockListResponse)
async def get_top_list(response: Response):
    try:
        stocks1 = await Stock.all().order_by('-fluctuation_rate').limit(10)
        stocks2 = await Stock.all().order_by('fluctuation_rate').limit(10)
        stocks3 = await Stock.all().order_by('-price').limit(10)
        stocks4 = await Stock.all().order_by('-m_capital').limit(10)
        stocks5 = await Stock.all().order_by('-volume').limit(10)
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return GetTopStockListResponse(message="failed")
    return GetTopStockListResponse(stocks1=stocks1, stocks2=stocks2, stocks3=stocks3, stocks4=stocks4, stocks5=stocks5)


@router.get("/{user_id}",
            description="관심 종목 리스트",
            response_model=GetFavoriteStockListResponse)
async def get_favorite_list(user_id: int, response: Response):
    try:
        user = await User.get(id=user_id)
        stock = await user.my_stock
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return GetFavoriteStockListResponse(message="failed")
    return GetFavoriteStockListResponse(user_id=user_id, stocks=stock)