package com.motoo.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotEmpty;


@Getter @Setter
@ApiModel("UpdateUserProfileRequest")
public class UpdateUserProfileReq {


    @NotEmpty
    @ApiModelProperty(name = "유저 닉네임", example = "김행")
    String nickname;

    @NotEmpty
    @ApiModelProperty(name = "학교_id", example = "1")
    int school_id;

    @NotEmpty
    @ApiModelProperty(name = "현재 주계좌", example = "1")
    int current;



}
