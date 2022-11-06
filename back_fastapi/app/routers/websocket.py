import tortoise
from fastapi import APIRouter, Response, WebSocket


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