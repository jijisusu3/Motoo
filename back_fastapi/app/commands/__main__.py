import typer
from app.commands import daily
from app.config import settings, TORTOISE_ORM
from tortoise import Tortoise, BaseDBAsyncClient
from tortoise import connections

import asyncio
app = typer.Typer()

# app.add_typer(ex1.app, name="ex")
app.add_typer(daily.app, name="daily")


if __name__ == "__main__":
    asyncio.run(Tortoise.init(
        TORTOISE_ORM
    ))
    conn: BaseDBAsyncClient = connections.get("default")
    app()