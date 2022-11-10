package com.motoo.api.dto.accountDetail;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class TradingStock {
    Date TradingDate;
    String StockName;
    String Ticker;
    int AvgPrice;
    int Amount;
    int Price;
    int TotalTradingPrice;
    int TradingPL;
    float TradingPLRatio;
}
