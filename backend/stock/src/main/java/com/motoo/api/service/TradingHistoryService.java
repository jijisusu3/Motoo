package com.motoo.api.service;

import com.motoo.api.dto.accountDetail.TradingHistory;
import com.motoo.api.dto.accountDetail.HistoryItem;

import java.util.List;

public interface TradingHistoryService {
    /**
     * 거래내역
     */
    TradingHistory getTradingHistory(Long userId, Long accountId);
    List<HistoryItem> getAllTradingHistory(Long userId, Long accountId);
    List<HistoryItem> getStockTradingHistory(Long userId, Long accountId);
    List<HistoryItem> getSellTradingHistory(Long userId, Long accountId);
    List<HistoryItem> getBuyTradingHistory(Long userId, Long accountId);
    List<HistoryItem> getCashHistory(Long userId, Long accountId);
}
