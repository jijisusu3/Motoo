package com.motoo.api.service;

import com.motoo.api.dto.accountDetail.Portfolio;

import java.util.List;

public interface PortfolioService {
    List<Portfolio> getPortfolioList(Long accountId, Long userId);

    List<Portfolio> getPortfolioListOrderByRatio(Long accountId, Long userId);

}
