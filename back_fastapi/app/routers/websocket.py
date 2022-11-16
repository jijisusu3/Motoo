import tortoise
from fastapi import APIRouter, Response, WebSocket
import time
from datetime import datetime
from typing import List
from tortoise.signals import post_save

from app.models.stocks import Stock, Category

router = APIRouter(prefix="/socket")


@router.websocket("/ws")
async def websocket_endpoint(websoket: WebSocket):
    await websoket.accept()
    signals = {"state": False}

    @post_save(Category)
    async def signal_post_save(
            sender: "Type[Category]",
            instance: Category,
            created: bool,
            using_db: "Optional[BaseDBAsyncClient]",
            update_fields: List[str],
    ) -> None:
        signals["state"] = True

    while True:
        if signals["state"]:
            await websoket.send_json({
                "result": True
            })
            signals["state"] = False
