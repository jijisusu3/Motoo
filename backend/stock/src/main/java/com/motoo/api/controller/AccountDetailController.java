package com.motoo.api.controller;


import com.motoo.api.dto.accountDetail.*;
import com.motoo.api.service.*;
import com.motoo.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "계좌 상세조회 API", tags = {"AccountDetail"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api2/detail")
public class AccountDetailController {
    private final UserService userService;
    private final PortfolioService portfolioService;
    private final AccountAssetService accountAssetService;
    private final TradingProfitLossService tradingProfitLossService;
    private final TradingHistoryService tradingHistoryService;
    private final AccountService accountService;

    @GetMapping
    @ApiOperation(value = "계좌 상세조회", notes = "(token) 계좌를 계좌 상세조회한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "계좌 상세조회 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "계좌 계좌 상세조회 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    public AccountDetailDTO accountDetail(Authentication authentication, Long accountId) {
        Long userId = userService.getUserIdByToken(authentication);
        AccountDetailDTO detailBuild = AccountDetailDTO.builder()
                .AccountName(accountService.getAccount(accountId, userId).getName())
                .School(accountService.getAccount(accountId, userId).isSchool())
                .PortfolioList(portfolioService.getPortfolioListOrderByRatio(accountId, userId))
                .accountAsset(accountAssetService.getAccountAsset(accountId, userId))
                .tradingProfitLoss(tradingProfitLossService.getTradingProfitLoss(userId, accountId))
                .tradingHistory(tradingHistoryService.getTradingHistory(userId, accountId))
                .build();
        return detailBuild;
    }
}
