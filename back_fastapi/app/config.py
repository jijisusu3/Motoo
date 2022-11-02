import os
from pydantic import BaseSettings
import redis

# load_dotenv()


class Settings(BaseSettings):
    # DB_URL: str = os.environ.get("DB_URL")
    # ROOT_PASSWORD: str = os.environ.get("ROOT_PASSWORD")
    # OPEN_API_DOMAIN: str = os.environ.get("OPEN_API_DOMAIN")
    # CANDLE_API_URL: str = os.environ.get("CANDLE_API_URL")
    # APPKEY_FOR_CANDLE: str = os.environ.get("APPKEY_FOR_CANDLE")
    # APPSECRET_FOR_CANDLE: str = os.environ.get("APPSECRET_FOR_CANDLE")
    # TRADE_ID_FOR_CANDLE: str = os.environ.get("TRADE_ID_FOR_CANDLE")
    # REDIS_HOST: str = os.environ.get("REDIS_HOST")
    # REDIS_PORT: int = os.environ.get("REDIS_PORT")
    DB_URL: str = ""
    ROOT_PASSWORD: str = ""
    OPEN_API_DOMAIN: str = ""
    CANDLE_API_URL: str = ""
    APPKEY_FOR_CANDLE: str = ""
    APPSECRET_FOR_CANDLE: str = ""
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
        }
    },
    'use_tz': False,
    'timezone': 'Asia/Seoul'
}


pool = redis.ConnectionPool(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    # password=configs.REDIS_PASSWORD,
    decode_responses=True
)
redis_session = redis.Redis(connection_pool=pool)
