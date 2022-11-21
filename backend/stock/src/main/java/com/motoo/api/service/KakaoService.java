package com.motoo.api.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.motoo.api.dto.kakao.KakaoProfile;
import com.motoo.api.dto.kakao.OauthToken;
import com.motoo.api.dto.user.AccountStockInfo;
import com.motoo.api.dto.user.BaseUserInfo;
import com.motoo.api.response.LoginResponse;
import com.motoo.common.util.JwtTokenUtil;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Component
public class KakaoService {

    private final String CLIENT_ID;
    private final String REDIRECT_URI;
    private final UserService userService;
    private final AccountService accountService;


    public KakaoService(@Value("${kakao.client_id}") String CLIENT_ID,
                        @Value("${kakao.redirect_uri}") String REDIRECT_URI, UserService userService, AccountService accountService) {
        this.CLIENT_ID = CLIENT_ID;
        this.REDIRECT_URI = REDIRECT_URI;
        this.userService = userService;
        this.accountService = accountService;

    }

    /**
     * 카카오 엑세스토큰 받아오기
     */
    public String getAccessToken(String code) {
        RestTemplate rt = new RestTemplate();

        //헤더 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //바디생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type","authorization_code");
        params.add("client_id", CLIENT_ID);
        params.add("redirect_uri", REDIRECT_URI);
        params.add("code", code);

        //헤더 바디 하나에 담기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);
        //http 요청해서 응답받기
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        OauthToken oauthToken = null;
        try {
            oauthToken = objectMapper.readValue(response.getBody(), OauthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        String access_token = oauthToken.getAccess_token();
        return access_token;
    }
    /**
     * 카카오로부터 유저 정보 받아오기
     */
    public KakaoProfile getUserInfo(String access_token) {

        RestTemplate rt2 = new RestTemplate();
        //헤더2 생성
        HttpHeaders headers2 = new HttpHeaders();
        headers2.add("Authorization", "Bearer " + access_token);
        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers2);

        ResponseEntity<String> response2 = rt2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );


        ObjectMapper objectMapper2 = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper2.readValue(response2.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }



        return kakaoProfile;
    }

    /**
     * 로그인하고 JWT 토큰 발급
     */
    public LoginResponse kakaoLogin(KakaoProfile userInfo) {

        //카카오에서 받아온 유저정보가 DB에 있는지 조회
        String kakaoEmail = userInfo.getKakao_account().getEmail();
        String kakaoNickname = userInfo.getProperties().getNickname();
        Optional<User> DBUser = userService.getByUserEmail(kakaoEmail);

        // kakao 이메일 DB에 없으면 회원가입 후 로그인 처리
        if (DBUser.isEmpty()) {
            Long newUserId = userService.signupUser(kakaoEmail, kakaoNickname);
            DBUser = userService.getByUserId(newUserId);
            //초기 계좌 개설 로직
            String newAccountName = kakaoNickname+"님의 계좌";
            Long accountId = accountService.createAccount(newUserId, newAccountName);

            int intAccountId = accountId.intValue();

            Account account = accountService.getAccount(accountId, newUserId);
            account.updateIsMain(true);
            userService.updateCurrent(newUserId, intAccountId);

        }
        // 있으면 바로 로그인 처리
        String token = JwtTokenUtil.getToken(DBUser.get().getEmail());


        //토큰과 유저객체 반환
        BaseUserInfo baseUserInfo = BaseUserInfo.of(DBUser);

        //관심 주식 종목 코드 세팅
        List<String> favoriteStockCode = userService.getFavoriteStockCode(DBUser);
        baseUserInfo.setFavoriteStockCode(favoriteStockCode);

        //주 계좌 시드머니 세팅
        int seed = userService.getAccountSeed(DBUser);
        baseUserInfo.setSeed(seed);

        //주 계좌 보유 주식 정보 세팅
        List<AccountStockInfo> stockInfo = userService.getStockInfo(DBUser);
        baseUserInfo.setStockInfo(stockInfo);

        baseUserInfo.setFavoriteStockCode(favoriteStockCode);
        LoginResponse response = LoginResponse.of(token, baseUserInfo);

        return response;
    }


    public String dummySignup(String email, String nickname) {

        Long newUserId = userService.signupUser(email, nickname);
        Optional<User> dummyUser = userService.getByUserId(newUserId);
        //초기 계좌 개설 로직
        String newAccountName = nickname+"님의 계좌";
        Long accountId = accountService.createAccount(newUserId, newAccountName);

        int intAccountId = accountId.intValue();

        Account account = accountService.getAccount(accountId, newUserId);
        account.updateIsMain(true);
        userService.updateCurrent(newUserId, intAccountId);

        String token = JwtTokenUtil.getToken(dummyUser.get().getEmail());

        return token;
    }
}
