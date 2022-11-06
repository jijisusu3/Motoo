from fastapi import APIRouter

from app.routers import stock_back, stocks, keyword_back, category, websocket

router = APIRouter(
    prefix="/api1",
)

# router.include_router(index.router)
router.include_router(stock_back.router)
router.include_router(stocks.router)
router.include_router(keyword_back.router)
router.include_router(category.router)
router.include_router(websocket.router)
# router.include_router(list.router)