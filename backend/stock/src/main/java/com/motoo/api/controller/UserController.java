package com.motoo.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.motoo.api.dto.kakao.KakaoProfile;
import com.motoo.api.dto.kakao.OauthToken;
import com.motoo.api.dto.user.BaseUserInfo;
import com.motoo.api.response.LoginResponse;
import com.motoo.api.service.KakaoService;
import com.motoo.api.service.UserService;
import com.motoo.common.util.JwtTokenUtil;
import com.motoo.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    private final KakaoService kakaoService;

    @GetMapping("/test/test")
    public String test() {
        return "hello";
    }

    @GetMapping("/auth/kakao/callback")
    public LoginResponse login(String code) {
        System.out.println("kakaoservice");
        String accessToken = kakaoService.getAccessToken(code);
        KakaoProfile userInfo = kakaoService.getUserInfo(accessToken);

        //카카오에서 받아온 해당 유저의 이메일이 DB에 있는지 조회
        String kakaoEmail = userInfo.getKakao_account().getEmail();
        Optional<User> DBUser = userService.getByUserEmail(kakaoEmail);

        LoginResponse loginResponse = kakaoService.kakaoLogin(DBUser, kakaoEmail);

        return loginResponse;
    }

}
