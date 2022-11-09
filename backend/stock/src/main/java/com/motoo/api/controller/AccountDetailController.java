package com.motoo.api.controller;


import com.motoo.api.dto.accountDetail.AccountAsset;
import com.motoo.api.dto.accountDetail.Portfolio;
import com.motoo.api.dto.accountDetail.ValueStock;
import com.motoo.api.service.AccountAssetService;
import com.motoo.api.service.AccountStockService;
import com.motoo.api.service.PortfolioService;
import com.motoo.api.service.UserService;
import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.AccountStock;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api2/detail")
public class AccountDetailController {
    private final PortfolioService portfolioService;
    private final AccountAssetService accountAssetService;
    private final UserService userService;

    @GetMapping
    public List<ValueStock> test(Long userId, Long accountId) {
        List<ValueStock> test = accountAssetService.getStockOrderByValuePLRatio(accountId, userId);
        return test;
    }
}
