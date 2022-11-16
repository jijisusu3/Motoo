import tortoise
from fastapi import APIRouter, Response, WebSocket
import time
from datetime import datetime

router = APIRouter(prefix="/socket")


@router.websocket("/ws")
async def websocket_endpoint(websoket: WebSocket):
    await websoket.accept()
    while True:
        data = await websoket.receive_text()
        print(data)
        await websoket.send_json({
            "result": True
        })
        # week = datetime.now().weekday()
        # hour = datetime.now().hour
        # min = datetime.now().minute
        # sec = datetime.now().second
        # if week < 5:
        #     if 9 <= hour <=16 and min % 2 == 1 and sec == 1:
        #         await websoket.send_json({
        #             "result": True
        #         })
        # time.sleep(1)