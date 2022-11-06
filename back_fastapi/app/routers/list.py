# import tortoise
# from app.models.users import User
# from app.models.stocks import Stock

# from fastapi import APIRouter, Response
# from app.schemes.lists import GetFavoriteStockList, GetTopStockList

# router = APIRouter(prefix="/list")

# @router.get("/list/{user_id}", description="관심 종목 리스트", response_model=GetFavoriteStockList)
# async def get_favorite_list(user_id: int, response: Response):
#     try:
#         user = await User.get(id=user_id)
#     except tortoise.exceptions.DoesNotExist:
#         response.status_code = 404
#         return GetFavoriteStockListResponse(message="failed")
#     stocks = await stock[]