from fastapi import APIRouter

from app.routers import stock_back, stocks

router = APIRouter(
    # prefix="/project",
)

# router.include_router(index.router)
router.include_router(stock_back.router)
router.include_router(stocks.router)