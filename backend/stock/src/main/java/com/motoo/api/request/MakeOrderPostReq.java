package com.motoo.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Getter
@Setter
@ApiModel("MakeOrderPostRequest")
public class MakeOrderPostReq {
//    void writeOrder(Long userId, Long accountId, Long stockId, int tr_type, int price, int amount);


    @NotNull
    @ApiModelProperty(name = "계좌 id", example = "계좌 id 입니다.")
    Long accountId;

    @NotNull
    @ApiModelProperty(name = "주식 id", example = "주식 id 입니다.")
    Long stockId;
//    int tr_type, int price, int amount

    @NotNull
    @ApiModelProperty(name="거래 타입", example = "1= 판매, 2= 구매, 3= 판매예약, 4= 구매예약")
    int tr_type;

    @NotNull
    @ApiModelProperty(name = "거래 가격", example = "100")
    int price;

    @NotNull
    @ApiModelProperty(name = "거래량", example = "100")
    int amount;
}
