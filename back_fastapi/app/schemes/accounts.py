from datetime import date as date_type
from typing import List, Union
from pydantic import BaseModel, Field

from app.schemes.common import CommonResponse


class AccountStockInfo(BaseModel):
    stockId: Union[int, None] = None
    ticker: Union[str, None] = None
    amount: Union[int, None] = 0
    available: Union[int, None] = 0


class CheckAccountStockResponse(CommonResponse):
    statusCode: Union[int, None] = 200
    seed: int = 0
    availableSeed: Union[int, None] = 0
    stockInfo: Union[List[AccountStockInfo], None] = []
