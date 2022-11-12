from typing import Union, List
from pydantic import BaseModel, Field
from app.schemes.common import CommonResponse


class Category(BaseModel):
    id: int = None
    name: str = None
    keyword: Union[List[str], None] = Field(default=None, description="업종키워드")
    info: Union[str, None] = Field(description="업종정보")
    sentiment: Union[List[float], None] = Field(default=None, description="업종감정분석")
    represent: Union[List[str], None] = Field(default=None, description="대표종목")


class GetCategoryDetailResponse(Category, CommonResponse):
    pass
