package com.motoo.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter @Setter
@ApiModel("UpdateUserPutRequest")
public class UpdateUserCurrentAccountPutReq {

    @NotNull
    @ApiModelProperty(name = "현재 주계좌", example = "1")
    int current;

}
