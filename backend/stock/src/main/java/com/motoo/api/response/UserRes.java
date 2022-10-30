package com.motoo.api.response;

import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserRes extends BaseResponseBody {

    String email;

    String username;

    String nickname;

    int school_id;

    int current;


    public static UserRes of(User user, Integer statusCode, String message) {


        UserRes res = new UserRes();
        res.setNickname(user.getNickname());
        res.setEmail(user.getEmail());
        res.setCurrent(user.getCurrent());
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
