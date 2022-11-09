package com.motoo.api.service;

import com.motoo.api.dto.accountDetail.TradingHistory;
import com.motoo.api.dto.accountDetail.HistoryItem;

import java.util.List;

public interface TradingHistoryService {
    /**
     * 거래내역
     */
    TradingHistory getTradingHistory();
    List<HistoryItem> getAllTradingHistory();
    List<HistoryItem> getStockTradingHistory();
    List<HistoryItem> getSellTradingHistory();
    List<HistoryItem> getBuyTradingHistory();
    List<HistoryItem> getCashHistory();
    HistoryItem getHistoryItem();
}
