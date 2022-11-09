package com.motoo.api.dto.accountDetail;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ValueStock {
    Long StockId;
    String StockName;
    String Ticker;
    int AvgPrice;
    int Amount;
    int Price;
    int TotalValue;
    int ValuePL;
    float ValuePLRatio;
}
