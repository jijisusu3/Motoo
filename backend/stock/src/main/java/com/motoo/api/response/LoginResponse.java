package com.motoo.api.response;

import com.motoo.api.dto.user.BaseUserInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@ApiModel("LoginResponse")
public class LoginResponse {

    @ApiModelProperty(name = "토큰")
    private String token;
    @ApiModelProperty(name = "유저정보")
    private BaseUserInfo user;

    public static LoginResponse of(String token, BaseUserInfo user) {
        LoginResponse res = new LoginResponse();
        res.setToken(token);
        res.setUser(user);
        return res;
    }
}
