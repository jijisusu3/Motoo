import datetime
from pydantic import BaseModel, Field, validator


class CandleData(BaseModel):
    stock_id: int
    date: str
    time: str
    price: int
    volume: int
    open_price:int
    max_price: int
    min_price: int
