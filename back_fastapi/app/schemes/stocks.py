from datetime import date as date_type
from datetime import time as time_type
from datetime import datetime
from typing import List, Union
from pydantic import BaseModel, Field, validator

from app.schemes.common import CommonResponse


class MinMaxPrice(BaseModel):
    max_price: Union[int, None] = Field(default=None, description="최고가")
    min_price: Union[int, None] = Field(default=None, description="최저가")


class Volume(BaseModel):
    volume: Union[int, None] = Field(description="거래량")


class Price(BaseModel):
    price: Union[int, None] = Field(description="현재가")


class OpenPrice(BaseModel):
    open_price: Union[int, None] = Field(description="시작가")


class ClosePrice(BaseModel):
    close_price: Union[int, None] = Field(description="종가")


class ChartBase(MinMaxPrice, Volume, OpenPrice):
    id: int
    stock_id: int
    date: date_type = Field(default=None, description="날짜")


class CandleData(ChartBase, Price):
    time: str


class DayChartData(ChartBase, ClosePrice):
    pass


class ShortStockData(Volume, Price):
    id: Union[int, None]
    name: Union[str, None] = Field(description="종목이름")
    fluctuation_rate: Union[float, None] = Field(description="등락률")
    fluctuation_price: Union[int, None] = Field(description="등락가")
    trading_value: Union[int, None] = Field(default=None, description="거래대금")
    daily: Union[List[CandleData], None] = Field(default=[], description="당일 10분봉")


class EntireStockData(ShortStockData, MinMaxPrice, OpenPrice, ClosePrice):
    ticker: Union[str, None]
    category_id: Union[int, None] = Field(description="업종 id")
    category_name: Union[str, None] = Field(default=None, description="업종 이름")
    per: Union[float, None] = Field(default=None, description="주가수익률")
    roe: Union[float, None] = Field(default=None, description="자기자본이익률")
    eps: Union[float, None] = Field(default=None, description="주당순이익")
    m_capital: Union[int, None] = Field(description="시가총액")
    issued: Union[int, None] = Field(description="발행주식수")
    keyword: Union[List[str], None] = Field(description="종목키워드")
    sentiment: Union[List[float], None] = Field(description="종목감정분석")
    capital: Union[int, None] = Field(default=None, description="자본금")
    weekly: Union[List[CandleData], None] = Field(default=[], description="주간 60분봉")
    monthly: Union[List[DayChartData], None] = Field(default=[], description="월간 10분봉")
    yearly: Union[List[DayChartData], None] = Field(default=[], description="연간 10분봉")


class GetStockDetailResponse(EntireStockData, CommonResponse):
    pass
