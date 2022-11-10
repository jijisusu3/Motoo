package com.motoo.api.dto.accountDetail;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@Builder
public class AccountDetailDTO {
    List<Portfolio> PortfolioList;

    AccountAsset accountAsset;

    TradingProfitLoss tradingProfitLoss;

    TradingHistory tradingHistory;
}
