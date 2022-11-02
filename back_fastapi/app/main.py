from app.config import TORTOISE_ORM, settings
from app.routers import router
from app.models.candles import *
from app.models.stocks import Stock
import os
from dotenv import load_dotenv
from fastapi import FastAPI
import typer
import asyncio
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise

from app.routers.stock_back import update_stock_back

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))
app = FastAPI(title="b204", version="0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

register_tortoise(app=app, config=TORTOISE_ORM)


app.include_router(router)


@app.get("/")
async def root():
    return {"message": settings.OPEN_API_DOMAIN}

#
# def main():
#     asyncio.run(update_stock_back("104000"))
#
#
# if __name__ == "__main__":
#     typer.run(main)
