package com.motoo.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ApiModel("UpdateAccountNameRequest")
public class UpdateAccountNameReq {

    @NotNull
    @ApiModelProperty(name = "계좌_id", example = "1")
    Long accountId;

    @NotNull
    @ApiModelProperty(name = "계좌 이름", example = "김행의 계좌")
    String name;
}
