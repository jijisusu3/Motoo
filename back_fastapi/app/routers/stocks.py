import datetime
import time
import requests
from collections import defaultdict

from app.models.stocks import Stock
from app.routers.const import *
from app.config import settings, redis_session

from fastapi import APIRouter, BackgroundTasks
import aiohttp
import pykrx
import asyncio
import typer
from app.schemes.common import CommonResponse
from app.schemes.stocks import CandleData

router = APIRouter(prefix="/stocks")


@router.get("/detail/{ticker}", description="주식 상세 조회")
async def get_stock_detail(ticker: str):
    stock = await Stock.get(ticker=ticker)
    return stock