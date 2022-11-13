package com.motoo.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotEmpty;


@Getter @Setter
@ApiModel("UpdateUserProfileRequest")
public class UpdateUserNickNameReq {


    @NotEmpty
    @ApiModelProperty(name = "유저 닉네임", example = "김행")
    String nickname;





}
