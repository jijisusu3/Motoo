package com.motoo.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
@ApiModel("AccountStockRequest")
public class AccountStockAddPostReq {

    //계좌 id
    @NotNull
    @ApiModelProperty(name = "계좌_id", example = "1")
    Long accountId;

    //주식 id
    @NotNull
    @ApiModelProperty(name = "주식_id", example = "1")
    Long stockId;

    @NotNull
    @ApiModelProperty(name = "주식 갯수", example = "2")
    int amount;

    @NotNull
    @ApiModelProperty(name = "주식 가격", example = "20000")
    int price;



}
