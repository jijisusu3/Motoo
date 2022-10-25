from typing import List
from datetime import datetime

from pydantic import BaseModel, Field, validator


class CommonResponse(BaseModel):
    message: str = "success"


class CommonDetailResponse(CommonResponse):
    detail: str
