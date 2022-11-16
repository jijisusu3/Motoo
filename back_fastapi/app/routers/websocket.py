import threading

from typing import List
from fastapi import APIRouter, WebSocket

from app.const import *

router = APIRouter(prefix="/socket")


@router.websocket("/ws/{ticker}")
async def websocket_endpoint(ticker: str, websocket: WebSocket):
    await websocket.accept()
    # try:
    while True:
        if redis_session.get("updated") is not None:

            await websocket.send_json({"result": True})
        threading.Event().wait(1)
