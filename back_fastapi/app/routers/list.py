import tortoise
from app.models.users import User
from app.models.stocks import Stock

from app.schemes.lists import Top

from fastapi import APIRouter, Response, Depends
from app.routers.authentication import get_current_user
from app.schemes.lists import GetFavoriteStockListResponse, GetTopStockListResponse

router = APIRouter(prefix="/list")


@router.get("/top", description="실시간 종목 리스트", response_model=GetTopStockListResponse, response_model_exclude_none=True)
async def get_top_list(response: Response):
    try:
        rate_up = Top(rate_up=await Stock.all().order_by('-fluctuation_rate').limit(10))
        rate_down = Top(rate_down=await Stock.all().order_by('fluctuation_rate').limit(10))
        capital_up = Top(capital_up=await Stock.all().order_by('-m_capital').limit(10))
        volume_up = Top(volume_up=await Stock.all().order_by('-volume').limit(10))
        top = [rate_up, rate_down, capital_up, volume_up]
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return GetTopStockListResponse(message="failed")
    return GetTopStockListResponse(result=top)


@router.get("/favorite",
            description="관심 종목 리스트",
            response_model=GetFavoriteStockListResponse)
async def get_favorite_list(response: Response, user: User = Depends(get_current_user)):
    try:
        stock = await user.my_stock
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return GetFavoriteStockListResponse(message="failed")
    return GetFavoriteStockListResponse(user_id=user.pk, stocks=stock)
