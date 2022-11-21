from fastapi import APIRouter

from app.routers import stock_back, stocks, category, list, authentication, accounts

router = APIRouter(
    prefix="/api1",
)

router.include_router(stock_back.router)
router.include_router(stocks.router)
router.include_router(category.router)
router.include_router(list.router)
router.include_router(authentication.router)
router.include_router(accounts.router)
