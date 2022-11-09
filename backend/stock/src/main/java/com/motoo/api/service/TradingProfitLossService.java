package com.motoo.api.service;

import com.motoo.api.dto.accountDetail.TradingProfitLoss;
import com.motoo.api.dto.accountDetail.TradingStock;

import java.util.List;

public interface TradingProfitLossService {
    /**
     * 판매손익
     */
    TradingProfitLoss getTradingProfitLoss();
    List<TradingStock> getStockOrderByTradingPL();
    List<TradingStock> getStockStockOrderByTradingPLRatio();
    TradingStock getTradingStock();
}
