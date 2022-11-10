from fastapi import APIRouter

from app.routers import stock_back, stocks, category, websocket, list, authentication

router = APIRouter(
    prefix="/api1",
)

# router.include_router(index.router)
router.include_router(stock_back.router)
router.include_router(stocks.router)
router.include_router(category.router)
router.include_router(websocket.router)
router.include_router(list.router)
router.include_router(authentication.router)