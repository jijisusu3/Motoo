package com.motoo.api.dto.accountDetail;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class TradingHistory {
    List<HistoryItem> AllTradingHistory;
    List<HistoryItem> StockTradingHistory;
    List<HistoryItem> SellTradingHistory;
    List<HistoryItem> BuyTradingHistory;
    List<HistoryItem> CashHistory;
}
