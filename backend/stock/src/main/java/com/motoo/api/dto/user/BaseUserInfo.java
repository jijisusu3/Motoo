package com.motoo.api.dto.user;


import com.motoo.api.service.UserService;
import com.motoo.api.service.UserServiceImpl;
import com.motoo.db.entity.FavoriteStock;
import com.motoo.db.entity.Stock;
import com.motoo.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Setter @Getter
public class BaseUserInfo {
    private Long userId;

    private String email;

    private String nickname;

    // 현재 주계좌 번호
    private int current;

    //관심 주식 종목코드
    private List<String> favoriteStockCode;

    //퀴즈 풀었는지 여부
    private boolean todayQuiz;


    public static BaseUserInfo of(Optional<User> user) {
        BaseUserInfo userinfo = new BaseUserInfo();
        userinfo.setUserId(user.get().getUserId());
        userinfo.setEmail(user.get().getEmail());
        userinfo.setNickname(user.get().getNickname());
        userinfo.setCurrent(user.get().getCurrent());

        return userinfo;
    }
}
