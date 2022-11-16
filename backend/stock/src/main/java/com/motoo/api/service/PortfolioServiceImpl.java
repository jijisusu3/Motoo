package com.motoo.api.service;

import com.google.common.collect.Lists;
import com.motoo.api.dto.accountDetail.Portfolio;
import com.motoo.db.entity.AccountStock;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService{
    private final AccountService accountService;
    private final AccountAssetService accountAssetService;

    @Override
    public List<Portfolio> getPortfolioList(Long accountId, Long userId) {
        int cash = accountService.getAccount(accountId, userId).getSeed();
        int stockAsset = accountAssetService.getStockAsset(accountId, userId);
        Portfolio portfolioCash = Portfolio.builder()
                .ItemName("현금")
                .Ratio((float) cash / (float) (stockAsset + cash) * 100)
                .build();
        List<AccountStock> accountStockList = accountService.getAccountStockByUserIdAccountId(accountId, userId);
        List<Portfolio> portfolioList = accountStockList.stream().map(accountStock -> {
            Portfolio build = Portfolio.builder()
                    .ItemName(accountStock.getStock().getName())
                    .Ratio((float) (accountStock.getAmount() * accountStock.getStock().getPrice()) / (float) (stockAsset + cash) * 100)
                    .build();
            return build;
        }).collect(Collectors.toList());

        portfolioList.add(portfolioCash);
        return portfolioList;
    }

    @Override
    public List<Portfolio> getPortfolioListOrderByRatio(Long accountId, Long userId) {

        List<Portfolio> portfolioList = getPortfolioList(accountId, userId);


        portfolioList.sort(new Comparator<Portfolio>() {
            @Override
            public int compare(Portfolio o1, Portfolio o2) {
                if (o2.getRatio() - o1.getRatio() > 0) return 1;
                else if (o2.getRatio() - o1.getRatio() < 0) return -1;
                return 0;
            }
        });


        if (portfolioList.size() < 6) {
            return portfolioList;
        }

        List<Portfolio> subPortfolioList = Lists.newArrayList(portfolioList.subList(0,5));
        List<Float> ratioList = subPortfolioList.stream().map(portfolio -> portfolio.getRatio()).collect(Collectors.toList());

        float fiveSum = 0;
        for (int i=0; i < 5; i++) {
            fiveSum += ratioList.get(i);
        }

        Portfolio etcPortfolio = Portfolio.builder()
                .ItemName("기타")
                .Ratio(100 - fiveSum)
                .build();
        subPortfolioList.add(etcPortfolio);

        return subPortfolioList;
    }
}
