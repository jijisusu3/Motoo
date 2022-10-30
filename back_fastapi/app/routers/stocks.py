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


@router.get("/save_token", description="access token 저장", response_model=CommonResponse)