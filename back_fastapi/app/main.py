from app.config import TORTOISE_ORM, settings
from app.routers import router
from app.models.candles import *
from app.models.stocks import Stock

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise

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
    return {"message": "Tomato"}
