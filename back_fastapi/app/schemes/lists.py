from typing import Union, List
from pydantic import BaseModel, Field
from app.schemes.common import CommonResponse

class StockList(BaseModel):
  id: int
  fluctuation_rate: Union[float, None] = Field(description="등락률")
  price: Union[int, None] = Field(description="현재가")
  name: Union[str, None] = Field(description="종목이름")
  ticker: Union[str, None]


class Favorite(BaseModel):
  user_id: int
  stocks: List[StockList]


class GetFavoriteStockListResponse(Favorite, CommonResponse):
  pass

class GetTopStockListResponse(CommonResponse):
  rate_up: List[StockList]
  rate_down: List[StockList]
  price_up: List[StockList]
  capital_up: List[StockList]
  volume_up: List[StockList]