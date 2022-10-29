from fastapi import APIRouter

from app.routers import stock_back

router = APIRouter(
    # prefix="/project",
)

# router.include_router(index.router)
router.include_router(stock_back.router)