package com.motoo.api.service;

import com.motoo.api.request.UpdateUserPutReq;
import com.motoo.db.entity.User;

import java.util.Optional;


/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */



public interface UserService {

    Optional<User> getByUserId(Long id);

    Optional<User> getByUserEmail(String email);

    Long signupUser(String email, String nickname);

    void deleteUser(String id);

    void updatePassword(User user, String pw);

    int updateUser(User user, UpdateUserPutReq updateUserPutReq);

}
