package com.motoo.api.dto.user;


import com.motoo.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;


@Setter @Getter
public class BaseUserInfo {
    private Long userId;

    private String email;

    private String username;

    private String nickname;

    private int current;

    public static BaseUserInfo of(Optional<User> user) {
        BaseUserInfo userinfo = new BaseUserInfo();
        userinfo.setUserId(user.get().getUserId());
        userinfo.setEmail(user.get().getEmail());
        userinfo.setUsername(user.get().getUsername());
        userinfo.setNickname(user.get().getNickname());
        userinfo.setCurrent(user.get().getCurrent());
        return userinfo;
    }
}