package com.motoo.api.response;

import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@ApiModel("UserResponse")
public class UserRes extends BaseResponseBody {


    @ApiModelProperty(name = "이메일")
    String email;
    @ApiModelProperty(name = "이름")
    String username;
    @ApiModelProperty(name = "닉네임")
    String nickname;
    @ApiModelProperty(name = "학교_id")
    int school_id;
    @ApiModelProperty(name = "현재주 계좌")
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
