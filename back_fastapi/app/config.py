from pydantic import BaseSettings

class Settings(BaseSettings):
    DB_URL: str = ""
    ROOT_PASSWORD: str=""


settings = Settings()

TORTOISE_ORM = {
    'connections': {
        'default': settings.DB_URL,
    },
    'apps': {
        'b204': {
            'models': [
                'aerich.models',
                'app.models.accounts',
            ],
            'default_connection': 'default',
        }
    },
    'use_tz': False,
    'timezone': 'Asia/Seoul'
}