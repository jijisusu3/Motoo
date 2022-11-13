package com.motoo.api.service;

import com.motoo.api.dto.user.AccountStockInfo;
import com.motoo.db.entity.User;
import org.springframework.security.core.Authentication;

import java.util.Date;
import java.util.List;
import java.util.Optional;


/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */



public interface UserService {

    Long getUserIdByToken(Authentication authentication);

    String getUserEmailByToken(Authentication authentication);

    Optional<User> getByUserId(Long id);

    Optional<User> getByUserEmail(String email);

    Long signupUser(String email, String nickname);

    void updateCurrent(Long userId, int current);

    void deleteUser(Long id);

    Long updateNickname(Long id, String nickname);

    Long updateQuizDay(Long id, Date quizday);

    void updateSchool(Long id, Long schoolId);

    void updateAverage(Long id, Float Average);

    void updateCurrentRank(Long id, Integer rankinschool);

    List<String> getFavoriteStockCode(Optional<User> user);

    int getAccountSeed(Optional<User> user);

    List<AccountStockInfo> getStockInfo(Optional<User> user);
//    Optional<User> user,
    List<AccountStockInfo> getStockInfoByAccountId(Long userId ,Long accountId);
}
