package com.motoo.api.service;

import com.motoo.api.dto.accountDetail.TradingProfitLoss;
import com.motoo.api.dto.accountDetail.TradingStock;
import com.motoo.db.entity.Trading;
import com.motoo.db.repository.TradingRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TradingProfitLossServiceImpl implements TradingProfitLossService{
    private final TradingService tradingService;
    private final TradingRepositorySupport tradingRepositorySupport;

    @Override
    public TradingProfitLoss getTradingProfitLoss(Long userId, Long accountId) {
        TradingProfitLoss tradingProfitLoss = TradingProfitLoss.builder()
                .StockOrderByTradingPL(getStockOrderByTradingPL(userId, accountId))
                .StockOrderByTradingPLRatio(getStockOrderByTradingPLRatio(userId, accountId))
                .build();
        return tradingProfitLoss;
    }

    @Override
    public List<TradingStock> getStockOrderByTradingPL(Long userId, Long accountId) {
        List<TradingStock> tradingStockList = getTradingStockList(userId, accountId);
        tradingStockList.sort((a, b) -> b.getTradingPL() - a.getTradingPL());
        return tradingStockList;
    }

    @Override
    public List<TradingStock> getStockOrderByTradingPLRatio(Long userId, Long accountId) {
        List<TradingStock> tradingStockList = getTradingStockList(userId, accountId);
        tradingStockList.sort(new Comparator<TradingStock>() {
            @Override
            public int compare(TradingStock o1, TradingStock o2) {
                if (o2.getTradingPLRatio() - o1.getTradingPLRatio() > 0) return 1;
                else if (o2.getTradingPLRatio() - o1.getTradingPLRatio() < 0) return -1;
                return 0;
            }
        });
        return tradingStockList;
    }

    @Override
    public List<TradingStock> getTradingStockList(Long userId, Long accountId) {
        List<Trading> tradings = tradingRepositorySupport.find1ByUserIdAccountId(userId, accountId);
        List<TradingStock> tradingStockList = tradings.stream().map(trading -> {
            TradingStock build = TradingStock.builder()
                    .TradingDate(trading.getTr_date())
                    .StockName(trading.getTicker_name())
                    .Ticker(trading.getTicker())
                    .AvgPrice(trading.getTr_avg())
                    .Amount(trading.getTr_amount())
                    .Price(trading.getTr_price())
                    .TotalTradingPrice(trading.getTr_amount() * trading.getTr_price())
                    .TradingPL((trading.getTr_price() - trading.getTr_avg()) * trading.getTr_amount())
                    .TradingPLRatio((float) (trading.getTr_price() - trading.getTr_avg()) / (float) trading.getTr_avg() * 100)
                    .build();
            return build;
        }).collect(Collectors.toList());
        return tradingStockList;
    }

    @Override
    public List<Trading> test(Long userId, Long accountId) {
//        List<Trading> tradings = tradingRepositorySupport.find1Or2Or5ByUserIdAccountId(userId, accountId);
        List<Trading> test = tradingService.tradingList1Or2(userId, accountId);
        return test;
    }
}
