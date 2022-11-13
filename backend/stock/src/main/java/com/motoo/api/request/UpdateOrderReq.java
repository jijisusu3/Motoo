package com.motoo.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ApiModel("UpdateOrderRequest")
public class UpdateOrderReq {


//    @NotNull
//    @ApiModelProperty(name = "거래 id", example = "거래 id 입니다.")
//    Long tradeId;

    @NotNull
    @ApiModelProperty(name = "거래 가격", example = "거래 가격 입니다.")
    int tr_price;

    @NotNull
    @ApiModelProperty(name = "거래량", example = "거래량 입니다.")
    int tr_amount;
}
