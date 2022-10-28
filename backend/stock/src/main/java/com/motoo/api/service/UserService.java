package com.motoo.api.service;

import com.motoo.api.request.UpdateUserPutReq;
import com.motoo.db.entity.User;


/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */



public interface UserService {

    User getByUserId(String id);

    User getByUserEmail(String email);

    User getByUserNameAndUserEmail(String username, String email);

    void deleteUser(String id);

    User getByUserNameAndUserEmailAndId(String username, String email, String id);

    void updatePassword(User user, String pw);

    int updateUser(User user, UpdateUserPutReq updateUserPutReq);

}
