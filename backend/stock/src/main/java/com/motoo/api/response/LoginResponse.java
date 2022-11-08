package com.motoo.api.response;

import com.motoo.api.dto.user.BaseUserInfo;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginResponse {
    private String token;
    private BaseUserInfo user;

    public static LoginResponse of(String token, BaseUserInfo user) {
        LoginResponse res = new LoginResponse();
        res.setToken(token);
        res.setUser(user);
        return res;
    }
}
