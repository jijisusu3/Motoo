import datetime
from typing import List
from pydantic import BaseModel, Field, validator


class ChartBase(BaseModel):
    id: int
    stock_id: int
    date: str
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
    daily: List[CandleData]


class EntireStockData(ShortStockData):
    ticker: str
    category_id: int
    category_name: str
    close_price: int
    maximum: int
    minimum: int
    per: float
    roe: float
    eps: float
    m_capital: int
    issued: int
    capital: int
    weekly: List[CandleData]
    monthly: List[DayChartData]
    yearly: List[DayChartData]




