package com.motoo.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LikeStockRequest")
public class LikeStockReq {
    @ApiModelProperty(name = "주식_id", example = "1")
    Long stockId;

}
