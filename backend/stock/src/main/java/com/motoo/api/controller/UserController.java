package com.motoo.api.controller;

import com.motoo.api.dto.kakao.KakaoProfile;
import com.motoo.api.dto.user.BaseUserInfo;
import com.motoo.api.response.LoginResponse;
import com.motoo.api.service.KakaoService;
import com.motoo.api.service.UserService;
import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api2/users")
public class UserController {
    private final UserService userService;
    private final KakaoService kakaoService;

    @GetMapping("/test1")
    public Long test1(Authentication authentication) {
        Long id = userService.getUserIdByToken(authentication);
        return id;
    }

    /**유저 정보 받아오기
     *
     */
    @GetMapping
    public BaseUserInfo profile(Authentication authentication) {
        Long id = userService.getUserIdByToken(authentication);
        Optional<User> user = userService.getByUserId(id);
        BaseUserInfo baseUserInfo = BaseUserInfo.of(user);
        List<String> favoriteStockCode = userService.getFavoriteStockCode(user);
        baseUserInfo.setFavoriteStockCode(favoriteStockCode);
        return baseUserInfo;
    }

    /**회원 탈퇴
     *
     */
    @DeleteMapping
    public ResponseEntity deleteUser(Authentication authentication) {
        Long id = userService.getUserIdByToken(authentication);
        userService.deleteUser(id);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원 탈퇴 성공"));
    }

    /**유저 닉네임 변경
     *
     */
    @PutMapping("/changenickname")
    public ResponseEntity changeNickname(Authentication authentication, @RequestParam String nickname) {
        if (nickname.length() == 0) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "닉네임 변경에 실패하였습니다."));
        }
        Long id = userService.getUserIdByToken(authentication);
        userService.updateNickname(id, nickname);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "닉네임이 변경되었습니다."));
    }

    /**소셜로그인
     *
     */
    @GetMapping("/auth/kakao/callback")
    public LoginResponse login(String code) {
        //카카오에 요청해서 유저 정보 받아오기
        String accessToken = kakaoService.getAccessToken(code);
        KakaoProfile userInfo = kakaoService.getUserInfo(accessToken);

        //로그인 시키고 토큰 유저객체 반환
        LoginResponse loginResponse = kakaoService.kakaoLogin(userInfo);

        return loginResponse;
    }

}
