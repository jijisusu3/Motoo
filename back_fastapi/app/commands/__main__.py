import typer
from app.commands import daily, market, keyword
from app.config import settings, TORTOISE_ORM
from tortoise import Tortoise, BaseDBAsyncClient
from tortoise import connections

import asyncio

app = typer.Typer()

app.add_typer(daily.app, name="daily")
app.add_typer(market.app, name="market")
app.add_typer(keyword.app, name="keyword")

if __name__ == "__main__":
    asyncio.run(Tortoise.init(
        TORTOISE_ORM
    ))
    conn: BaseDBAsyncClient = connections.get("default")
    app()
