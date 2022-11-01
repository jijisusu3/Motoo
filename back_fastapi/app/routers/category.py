from app.models.stocks import Category
from app.routers.const import *

from fastapi import APIRouter, Response

router = APIRouter(prefix="/categories")

@router.get("/detail/{category_id}", description="업종 상세 조회")