package com.motoo.api.dto.accountDetail;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@Builder
public class AccountDetailDTO {
    String AccountName;

    boolean School;

    List<Portfolio> PortfolioList;

    AccountAsset accountAsset;

    TradingProfitLoss tradingProfitLoss;

    TradingHistory tradingHistory;
}
