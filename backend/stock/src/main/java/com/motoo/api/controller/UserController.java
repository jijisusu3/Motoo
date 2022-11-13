package com.motoo.api.controller;

import com.motoo.api.dto.kakao.KakaoProfile;
import com.motoo.api.dto.user.AccountStockInfo;
import com.motoo.api.dto.user.BaseUserInfo;
import com.motoo.api.request.LikeStockReq;
import com.motoo.api.request.UpdateUserNickNameReq;
import com.motoo.api.request.UpdateUserCurrentAccountPutReq;
import com.motoo.api.response.AccountListRes;
import com.motoo.api.response.FavoriteStockRes;
import com.motoo.api.response.LoginResponse;
import com.motoo.api.service.AccountService;
import com.motoo.api.service.FavoriteStockService;
import com.motoo.api.service.KakaoService;
import com.motoo.api.service.UserService;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.User;
import com.motoo.common.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.persistence.EntityManager;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@Api(value = "유저 API", tags = {"Users"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api2/users")
public class UserController {
    private final UserService userService;
    private final KakaoService kakaoService;
    private final FavoriteStockService favoriteStockService;
    private final AccountService accountService;
    private final EntityManager entityManager;


    /**유저 정보 받아오기
     *
     */
    @GetMapping()
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 유저 정보 조회 성공", response = AccountListRes.class), @ApiResponse(code = 401, message = "유저 정보 조회 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "유저 정보 조회", notes = "유저 정보를 조회한다.")
    public BaseUserInfo profile(@ApiIgnore Authentication authentication) {
        Long id = userService.getUserIdByToken(authentication);
        Optional<User> user = userService.getByUserId(id);
        BaseUserInfo baseUserInfo = BaseUserInfo.of(user);
        //관심 주식 종목 코드 세팅
        List<String> favoriteStockCode = userService.getFavoriteStockCode(user);
        baseUserInfo.setFavoriteStockCode(favoriteStockCode);

        //주 계좌 시드머니 세팅
        int seed = userService.getAccountSeed(user);
        baseUserInfo.setSeed(seed);

        //주 계좌 보유 주식 정보 세팅
        List<AccountStockInfo> stockInfo = userService.getStockInfo(user);
        baseUserInfo.setStockInfo(stockInfo);
        return baseUserInfo;
    }

    /**회원 탈퇴
     *
     */
    @DeleteMapping()
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 탈퇴 성공", response = AccountListRes.class) })
    @ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴를 한다.")
    public ResponseEntity deleteUser(@ApiIgnore Authentication authentication) {
        Long id = userService.getUserIdByToken(authentication);
        userService.deleteUser(id);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원 탈퇴 성공"));
    }

    /**유저 닉네임 변경
     *
     */
    @PutMapping("/nickname")
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 닉네임이 변경되었습니다.", response = AccountListRes.class), @ApiResponse(code = 401, message = "닉네임 변경에 실패하였습니다.", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "유저 닉네임 변경", notes = "유저 닉네임을 변경한다.")
    public ResponseEntity changeNickname(@ApiIgnore Authentication authentication,  @RequestBody @ApiParam(value = "변경할 닉네임", required = true) @Valid UpdateUserNickNameReq updateUserNickNameReq) {
        if (updateUserNickNameReq.getNickname().length() == 0) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "닉네임 변경에 실패하였습니다."));
        }
        Long id = userService.getUserIdByToken(authentication);
        userService.updateNickname(id, updateUserNickNameReq.getNickname());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "닉네임이 변경되었습니다."));
    }

    /**유저 주계좌 변경
     *
     */
    @PutMapping("/current")
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 계좌가 변경되었습니다.", response = AccountListRes.class), @ApiResponse(code = 401, message = "계좌 변경에 실패하였습니다.", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "주계좌 변경 ", notes = "주계좌를 변경한다.")
    public ResponseEntity changeCurrent(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "변경할 주계좌", required = true) @Valid UpdateUserCurrentAccountPutReq updateUserCurrentAccountPutReq) {
        Long userId = userService.getUserIdByToken(authentication);
        // 변경요청이 온 계좌 id를, 해당 유저가 소유하고 있는지 체크
        int current = updateUserCurrentAccountPutReq.getCurrent();
        Long accountId = Long.valueOf(current);
        Account account = accountService.getAccount(accountId, userId);
        List<Account> accountList = accountService.listAccount(userId);

        //모든 계좌를 주계좌가 아닌것으로 바꿈
        for (Account value : accountList) {
            value.updateIsMain(false);
        }

         if (account==null) {

            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "계좌 변경에 실패하였습니다."));
        }
        account.updateIsMain(true);
        userService.updateCurrent(userId, updateUserCurrentAccountPutReq.getCurrent());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "계좌가 변경되었습니다."));
    }

    /**관심종목 등록/삭제
     *
     */
    @PostMapping("/like")
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 관심종목이 변경되었습니다.", response = AccountListRes.class), @ApiResponse(code = 401, message = "관심종목 변경에 실패하였습니다.", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "관심종목 변경 ", notes = "관심종목을 변경한다.")
    public ResponseEntity likeStock(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "관심종목에 넣을 주식_id", required = true) @Valid LikeStockReq likeStockReq) {
        Long userId = userService.getUserIdByToken(authentication);
        User user = userService.getByUserId(userId).orElseGet(() -> new User());
        List<Long> idList = favoriteStockService.getFavoriteStockIdList(user);

        //관심종목 리스트에 해당 주식이 있으면 관심종목 해제
        if (idList.contains(likeStockReq.getStockId())) {
            favoriteStockService.delistStock(userId, likeStockReq.getStockId());

            // 변경된 데이터를 반영하기 위해 cache 초기화 후 다시 조회
            entityManager.clear();
            User changedUser = userService.getByUserId(userId).orElseGet(() -> new User());
            List<String> favoriteStockCodeList = favoriteStockService.getFavoriteStockCodeList(changedUser);

            return ResponseEntity.status(200).body(FavoriteStockRes.of(favoriteStockCodeList,200, "관심종목에서 해제함"));
        }
        //관심종목 리스트에 해당 주식이 없으면 관심종목 등록
        favoriteStockService.registerStock(userId, likeStockReq.getStockId());

        // 변경된 데이터를 반영하기 위해 cache 초기화 후 다시 조회
        entityManager.clear();
        User changedUser = userService.getByUserId(userId).orElseGet(() -> new User());
        List<String> favoriteStockCodeList = favoriteStockService.getFavoriteStockCodeList(changedUser);

        return ResponseEntity.status(200).body(FavoriteStockRes.of(favoriteStockCodeList,200, "관심종목에 등록함"));
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

    /**
     * 더미계정 회원가입
     */
    @PostMapping("/dummysignup")
    public String dummy(String email, String nickname) {
        String dummyToken = kakaoService.dummySignup(email, nickname);
        return dummyToken;
    }
}
