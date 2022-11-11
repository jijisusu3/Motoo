import pytest
from httpx import AsyncClient
from tortoise import Tortoise

from app.main import app

DB_URL = "sqlite://:memory:"


async def init_db(db_url, create_db: bool = False, schemas: bool = False) -> None:
    """Initial database connection"""
    await Tortoise.init(
        db_url=db_url, modules={"b204": [
            'aerich.models',
            'app.models.users',
            'app.models.accounts',
            'app.models.stocks',
            'app.models.study',
            'app.models.daycharts',
            'app.models.candles',
        ]}, _create_db=create_db
    )
    if create_db:
        print(f"Database created! {db_url = }")
    if schemas:
        await Tortoise.generate_schemas()
        print("Success to generate schemas")


async def init(db_url: str = DB_URL):
    await init_db(db_url, True, True)


@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"


@pytest.fixture(scope="session")
async def client():
    async with AsyncClient(app=app, base_url="http://test/api1") as client:
        print("Client is ready")
        yield client


@pytest.fixture(scope="session", autouse=True)
async def initialize_tests():
    await init()
    yield
    print("droped")
    await Tortoise._drop_databases()
