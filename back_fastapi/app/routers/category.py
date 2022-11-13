import tortoise
from app.models.stocks import Category

from fastapi import APIRouter, Response
from app.schemes.categories import GetCategoryDetailResponse

router = APIRouter(prefix="/category")


@router.get("/{category_id}", description="업종 상세 조회", response_model=GetCategoryDetailResponse)
async def get_category_detail(category_id: int, response: Response):
    try:
        category = await Category.get(id=category_id)
    except tortoise.exceptions.DoesNotExist:
        response.status_code = 404
        return GetCategoryDetailResponse(message="failed")
    return GetCategoryDetailResponse(**dict(category))
