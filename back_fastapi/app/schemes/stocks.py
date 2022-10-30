from datetime import datetime
from typing import List, Union
from pydantic import BaseModel, Field, validator


class ChartBase(BaseModel):
    id: int
    stock_id: int
    date: datetime
    max_price: int
    min_price: int
    volume: int
    open_price: int


class CandleData(ChartBase):
    time: str
    price: int


class DayChartData(ChartBase):
    close_price: int


class ShortStockData(BaseModel):
    id: int
    price: int
    fluctuation_rate: float
    fluctuation_price: int
    volume: int
    trading_value: int
    daily: Union[List[CandleData], None] = []


class EntireStockData(ShortStockData):
    ticker: str
    category_id: int
    category_name: Union[str, None] = None
    close_price: int
    maximum: Union[int, None] = None
    minimum: Union[int, None] = None
    per: Union[float, None] = None
    roe: Union[float, None] = None
    eps: Union[float, None] = None
    m_capital: int
    issued: int
    capital: Union[int, None] = None
    weekly: Union[List[CandleData], None] = []
    monthly: Union[List[DayChartData], None] = []
    yearly: Union[List[DayChartData], None] = []




