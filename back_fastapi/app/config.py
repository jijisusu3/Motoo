from typing import List

import redis
from fastapi import WebSocket
from pydantic import BaseSettings


class Settings(BaseSettings):
    DB_URL: str = ""
    SEC_DB_URL: str = ""
    ROOT_PASSWORD: str = ""
    SECRET_KEY: str = ""
    ALGORITHM: str = ""
    ACCESS_TOKEN_EXPIRE_MINUTES: int = ""
    JWT_ISSUER: str = ""
    OPEN_API_DOMAIN: str = ""
    CANDLE_API_URL: str = ""
    PRICE_API_URL: str = ""
    BIDASK_API_URL: str = ""
    APPKEY_FOR_CANDLE: str = ""
    APPSECRET_FOR_CANDLE: str = ""
    APPKEY_FOR_BIDASK: str = ""
    APPSECRET_FOR_BIDASK: str = ""
    TRADE_ID_FOR_CANDLE: str = ""
    REDIS_HOST: str = ""
    REDIS_PORT: int
    CLIENT_ID: str = ""
    CLIENT_SECRET: str = ""
    NAVER_API_DOMAIN: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

TORTOISE_ORM = {
    'connections': {
        'default': settings.DB_URL,
        'second': settings.SEC_DB_URL,
    },
    'apps': {
        'b204': {
            'models': [
                'aerich.models',
                'app.models.users',
                'app.models.accounts',
                'app.models.stocks',
                'app.models.study',
                'app.models.daycharts',
                'app.models.candles',
            ],
            'default_connection': 'default',
        },
    },
    'use_tz': False,
    'timezone': 'Asia/Seoul'
}

pool = redis.ConnectionPool(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    password=settings.ROOT_PASSWORD,
    decode_responses=True
)
redis_session = redis.Redis(connection_pool=pool)


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()
