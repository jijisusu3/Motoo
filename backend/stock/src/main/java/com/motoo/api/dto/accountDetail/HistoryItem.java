package com.motoo.api.dto.accountDetail;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class HistoryItem {
    Date TradingDate;
    int TradingType;
    String StockName;
    String Ticker;
    int TotalTradingPrice;
}
