package com.motoo.api.service;

import com.motoo.api.dto.accountDetail.TradingProfitLoss;
import com.motoo.api.dto.accountDetail.TradingStock;
import com.motoo.db.entity.Trading;

import java.util.List;

public interface TradingProfitLossService {
    /**
     * 판매손익
     */
    TradingProfitLoss getTradingProfitLoss(Long userId, Long accountId);
    List<TradingStock> getStockOrderByTradingPL(Long userId, Long accountId);
    List<TradingStock> getStockOrderByTradingPLRatio(Long userId, Long accountId);
    List<TradingStock> getTradingStockList(Long userId, Long accountId);

    List<Trading> test(Long userId, Long accountId);
}
