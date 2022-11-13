package com.motoo.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@ApiModel("MakeAccountPostRequest")
public class MakeAccountPostReq {

    @NotEmpty
    @ApiModelProperty(name = "계좌 이름", example = "계좌 이름입니다.")
    String name;
}
