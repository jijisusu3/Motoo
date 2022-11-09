package com.motoo.api.service;

import com.motoo.api.dto.accountDetail.TradingHistory;
import com.motoo.api.dto.accountDetail.HistoryItem;
import com.motoo.db.entity.Trading;
import com.motoo.db.repository.TradingRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TradingHistoryServiceImpl implements TradingHistoryService {
    private final TradingRepositorySupport tradingRepositorySupport;
    @Override
    public TradingHistory getTradingHistory(Long userId, Long accountId) {
        TradingHistory historyBuild = TradingHistory.builder()
                .AllTradingHistory(getAllTradingHistory(userId, accountId))
                .StockTradingHistory(getStockTradingHistory(userId, accountId))
                .SellTradingHistory(getSellTradingHistory(userId, accountId))
                .BuyTradingHistory(getBuyTradingHistory(userId, accountId))
                .CashHistory(getCashHistory(userId, accountId))
                .build();
        return historyBuild;
    }

    @Override
    public List<HistoryItem> getAllTradingHistory(Long userId, Long accountId) {
        List<Trading> allTradingList = tradingRepositorySupport.find1Or2Or5ByUserIdAccountId(userId, accountId);
        List<HistoryItem> allHistoryItemList = allTradingList.stream().map(trading -> {
            HistoryItem allBuild = HistoryItem.builder()
                    .TradingDate(trading.getTr_date())
                    .TradingType(trading.getTr_type())
                    .StockName(trading.getTicker_name())
                    .Ticker(trading.getTicker())
                    .TotalTradingPrice(trading.getTr_price() * trading.getTr_amount())
                    .build();
            return allBuild;
        }).collect(Collectors.toList());
        allHistoryItemList.sort((a, b) -> b.getTradingDate().compareTo(a.getTradingDate()));
        return allHistoryItemList;
    }

    @Override
    public List<HistoryItem> getStockTradingHistory(Long userId, Long accountId) {
        List<Trading> stockTradingList = tradingRepositorySupport.find1Or2ByUserIdAccountId(userId, accountId);
        List<HistoryItem> stockHistoryItemList = stockTradingList.stream().map(trading -> {
            HistoryItem stockBuild = HistoryItem.builder()
                    .TradingDate(trading.getTr_date())
                    .TradingType(trading.getTr_type())
                    .StockName(trading.getTicker_name())
                    .Ticker(trading.getTicker())
                    .TotalTradingPrice(trading.getTr_price() * trading.getTr_amount())
                    .build();
            return stockBuild;
        }).collect(Collectors.toList());
        stockHistoryItemList.sort((a, b) -> b.getTradingDate().compareTo(a.getTradingDate()));

        return stockHistoryItemList;
    }

    @Override
    public List<HistoryItem> getSellTradingHistory(Long userId, Long accountId) {
        List<Trading> sellTradingList = tradingRepositorySupport.find1ByUserIdAccountId(userId, accountId);
        List<HistoryItem> sellHistoryItemList = sellTradingList.stream().map(trading -> {
            HistoryItem sellBuild = HistoryItem.builder()
                    .TradingDate(trading.getTr_date())
                    .TradingType(trading.getTr_type())
                    .StockName(trading.getTicker_name())
                    .Ticker(trading.getTicker())
                    .TotalTradingPrice(trading.getTr_price() * trading.getTr_amount())
                    .build();
            return sellBuild;
        }).collect(Collectors.toList());
        sellHistoryItemList.sort((a, b) -> b.getTradingDate().compareTo(a.getTradingDate()));
        return sellHistoryItemList;
    }

    @Override
    public List<HistoryItem> getBuyTradingHistory(Long userId, Long accountId) {
        List<Trading> buyTradingList = tradingRepositorySupport.find2ByUserIdAccountId(userId, accountId);
        List<HistoryItem> buyHistoryItemList = buyTradingList.stream().map(trading -> {
            HistoryItem buyBuild = HistoryItem.builder()
                    .TradingDate(trading.getTr_date())
                    .TradingType(trading.getTr_type())
                    .StockName(trading.getTicker_name())
                    .Ticker(trading.getTicker())
                    .TotalTradingPrice(trading.getTr_price() * trading.getTr_amount())
                    .build();
            return buyBuild;
        }).collect(Collectors.toList());
        buyHistoryItemList.sort((a, b) -> b.getTradingDate().compareTo(a.getTradingDate()));
        return buyHistoryItemList;
    }

    @Override
    public List<HistoryItem> getCashHistory(Long userId, Long accountId) {
        List<Trading> cashTradingList = tradingRepositorySupport.find5ByUserIdAccountId(userId, accountId);
        List<HistoryItem> cashHistoryItemList = cashTradingList.stream().map(trading -> {
            HistoryItem cashBuild = HistoryItem.builder()
                    .TradingDate(trading.getTr_date())
                    .TradingType(trading.getTr_type())
                    .StockName(trading.getTicker_name())
                    .Ticker(trading.getTicker())
                    .TotalTradingPrice(trading.getTr_price() * trading.getTr_amount())
                    .build();
            return cashBuild;
        }).collect(Collectors.toList());
        cashHistoryItemList.sort((a, b) -> b.getTradingDate().compareTo(a.getTradingDate()));
        return cashHistoryItemList;
    }
}
