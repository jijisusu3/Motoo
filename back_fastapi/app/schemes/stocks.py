from datetime import date as date_type
from typing import List, Union
from pydantic import BaseModel, Field

from app.schemes.common import CommonResponse


class MinMaxPrice(BaseModel):
    max_price: Union[int, None] = Field(default=None, description="최고가")
    min_price: Union[int, None] = Field(default=None, description="최저가")


class Volume(BaseModel):
    volume: Union[int, None] = Field(default=None, description="거래량")


class Price(BaseModel):
    price: Union[int, None] = Field(default=None, description="현재가")


class OpenPrice(BaseModel):
    open_price: Union[int, None] = Field(default=None, description="시작가")


class ClosePrice(BaseModel):
    close_price: Union[int, None] = Field(description="종가")


class ChartBase(MinMaxPrice, Volume, OpenPrice):
    id: int = None
    stock_id: int = None
    date: date_type = Field(default=None, description="날짜")


class CandleData(ChartBase, Price):
    time: str = None


class DayChartData(ChartBase, ClosePrice):
    pass


class CandleDataList(BaseModel):
    x: str
    y: List[Union[str, int]]


class MinAndMax(BaseModel):
    minimum: Union[int, None] = Field(description="하한가")
    maximum: Union[int, None] = Field(description="상한가")


class BaseStockData(Price):
    id: Union[int, None]
    name: Union[str, None] = Field(description="종목이름")
    fluctuation_rate: Union[float, None] = Field(description="등락률")


class ShortStockData(BaseStockData, Volume):
    fluctuation_price: Union[int, None] = Field(description="등락가")
    trading_value: Union[int, None] = Field(default=None, description="거래대금")
    daily: Union[List[CandleData], None] = Field(default=None, description="당일 10분봉")
    daily_min: Union[CandleData, None] = None
    daily_max: Union[CandleData, None] = None


class RealTimeStockResponse(Price, CommonResponse):
    fluctuation_rate: Union[float, None] = Field(description="등락률")
    fluctuation_price: Union[int, None] = Field(description="등락가")


class EntireStockData(ShortStockData, OpenPrice, ClosePrice, MinAndMax):
    ticker: Union[str, None]
    category_id: Union[int, None] = Field(description="업종 id")
    category_name: Union[str, None] = Field(default=None, description="업종 이름")
    per: Union[float, None] = Field(default=None, description="주가수익률")
    eps: Union[float, None] = Field(default=None, description="주당순이익")
    m_capital: Union[int, None] = Field(description="시가총액")
    div_yield: Union[float, None] = Field(default=None, description="배당수익률")
    keyword: Union[List[str], None] = Field(description="종목키워드")
    sentiment: Union[List[float], None] = Field(description="종목감정분석")
    weekly: Union[List[CandleData], None] = Field(default=None, description="주간 60분봉")
    weekly_min: Union[CandleData, None] = None
    weekly_max: Union[CandleData, None] = None
    monthly: Union[List[DayChartData], None] = Field(default=None, description="월간 일봉")
    monthly_min: Union[DayChartData, None] = None
    monthly_max: Union[DayChartData, None] = None
    yearly: Union[List[DayChartData], None] = Field(default=None, description="연간 7일봉")
    yearly_min: Union[DayChartData, None] = None
    yearly_max: Union[DayChartData, None] = None


class GetStockDetailResponse(EntireStockData, CommonResponse):
    pass


class GetShortStockResponse(ShortStockData, CommonResponse):
    pass


class GetTradingStockInfoResponse(CommonResponse, BaseStockData, MinAndMax):
    pass


class GetAllStocks(CommonResponse):
    stocks: List[EntireStockData] = []


class BidAskResponse(CommonResponse):
    bid_pr: List[str] = []
    ask_pr: List[str] = []
    bid_rsqn: List[str] = []
    ask_rsqn: List[str] = []


class SchoolHotStockResponse(CommonResponse):
    stock_id: Union[int, None] = None
    stock_name: Union[str, None] = None
    stock_ticker: Union[str, None] = None
