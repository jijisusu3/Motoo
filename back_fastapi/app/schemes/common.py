from pydantic import BaseModel


class CommonResponse(BaseModel):
    message: str = "success"


class CommonDetailResponse(CommonResponse):
    detail: str
