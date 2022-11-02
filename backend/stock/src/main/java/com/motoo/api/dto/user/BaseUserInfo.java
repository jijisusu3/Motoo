package com.motoo.api.dto.user;


import com.motoo.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;


@Setter @Getter
public class BaseUserInfo {
    private Long userId;

    private String email;

    private String nickname;

    private int current;

    public static BaseUserInfo of(Optional<User> user) {
        BaseUserInfo userinfo = new BaseUserInfo();
        userinfo.setUserId(user.get().getUserId());
        userinfo.setEmail(user.get().getEmail());
<<<<<<< HEAD
//        userinfo.setUsername(user.get().getUsername());
//        userinfo.setNickname(user.get().getNickname());
=======
        userinfo.setNickname(user.get().getNickname());
>>>>>>> 351d0a53c08ee7ab4d3b217d5826f89c99dc2279
        userinfo.setCurrent(user.get().getCurrent());
        return userinfo;
    }
}
