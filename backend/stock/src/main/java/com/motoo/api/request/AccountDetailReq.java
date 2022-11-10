package com.motoo.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@ApiModel("AccountDetailRequest")
public class AccountDetailReq {

    @NotNull
    @ApiModelProperty(name = "계좌_id", example = "1")
    Long accountId;
}
