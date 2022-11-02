import tortoise
from app.models.stocks import Category

from fastapi import APIRouter, Response
from app.schemes.categories import GetCategoryDetailResponse

router = APIRouter(prefix="/categories")

@router.get("/detail/{category_id}", description="업종 상세 조회", response_model=GetCategoryDetailResponse)
async def get_category_detail(id: int, response: Response):
    try:
        category = await Category.get(id=id)
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return GetCategoryDetailResponse(message="failed")
    return GetCategoryDetailResponse(**dict(category))