import tortoise
from app.models.users import User
from app.models.stocks import Stock

from fastapi import APIRouter, Response
from app.schemes.categories import GetCategoryDetailResponse

router = APIRouter(prefix="/list")