package com.motoo.api.dto.accountDetail;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class AccountAsset {
    float TotalValuePLRatio;
    int Asset;
    int Cash;
    int AvailableCash;
    List<ValueStock> StockOrderByTotalValue;
    List<ValueStock> StockOrderByValuePLRatio;
}
