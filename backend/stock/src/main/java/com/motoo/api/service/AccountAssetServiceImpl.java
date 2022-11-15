package com.motoo.api.service;

import com.motoo.api.dto.accountDetail.*;
import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.Trading;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountAssetServiceImpl implements AccountAssetService {

    private final AccountService accountService;
    private final TradingService tradingService;

    @Override
    public AccountAsset getAccountAsset(Long accountId, Long userId) {
        int cash = accountService.getAccount(accountId, userId).getSeed();
        List<Trading> tradings4List = tradingService.tradingList4(userId, accountId);
        List<Integer> waitingPriceList = tradings4List.stream().map(trading -> trading.getTr_amount() * trading.getTr_price()).collect(Collectors.toList());
        int waitingPrice = waitingPriceList.stream().mapToInt(Integer::intValue).sum();
        int stockAsset = getStockAsset(accountId, userId);
        int asset = cash + stockAsset;
        float totalValuePLRatio = getTotalValuePLRatio(accountId, userId);
        AccountAsset build = AccountAsset.builder()
                .Asset(asset)
                .Cash(cash)
                .AvailableCash(cash - waitingPrice)
                .StockOrderByTotalValue(getStockOrderByTotalValue(accountId, userId))
                .StockOrderByValuePLRatio(getStockOrderByValuePLRatio(accountId, userId))
                .TotalValuePLRatio(totalValuePLRatio)
                .build();
        return build;
    }

    @Override
    public List<ValueStock> getStockOrderByTotalValue(Long accountId, Long userId) {
        List<ValueStock> valueStockList = getValueStockList(accountId, userId);
        valueStockList.sort((a, b) -> b.getTotalValue() - a.getTotalValue());
        return valueStockList;
    }

    @Override
    public List<ValueStock> getStockOrderByValuePLRatio(Long accountId, Long userId) {
        List<ValueStock> valueStockList = getValueStockList(accountId, userId);
        valueStockList.sort(new Comparator<ValueStock>() {
            @Override
            public int compare(ValueStock o1, ValueStock o2) {
                if (o2.getValuePLRatio() - o1.getValuePLRatio() > 0) return 1;
                else if (o2.getValuePLRatio() - o1.getValuePLRatio() < 0) return -1;
                return 0;
            }
        });
//        valueStockList.sort((a, b) -> (int) (b.getValuePLRatio() - a.getValuePLRatio()));
        return valueStockList;
    }

    @Override
    public List<ValueStock> getValueStockList(Long accountId, Long userId) {
        List<AccountStock> stockList = accountService.getAccountStockByUserIdAccountId(accountId, userId);
        List<ValueStock> valueStocksList = stockList.stream().map(accountStock -> {
            ValueStock build = ValueStock.builder()
                    .StockId(accountStock.getStock().getStockId())
                    .StockName(accountStock.getStock().getName())
                    .Ticker(accountStock.getStock().getTicker())
                    .AvgPrice(accountStock.getPrice())
                    .Amount(accountStock.getAmount())
                    .Price(accountStock.getStock().getPrice())
                    .TotalValue(accountStock.getStock().getPrice() * accountStock.getAmount())
                    .ValuePL((accountStock.getStock().getPrice() - accountStock.getPrice()) * accountStock.getAmount())
                    .ValuePLRatio((float)(accountStock.getStock().getPrice() - accountStock.getPrice()) / (float)accountStock.getPrice() * 100)
                    .build();
            return build;
        }).collect(Collectors.toList());
        return valueStocksList;
    }

    @Override
    public int getStockAsset(Long accountId, Long userId) {
        List<AccountStock> accountStockList = accountService.getAccountStockByUserIdAccountId(accountId, userId);
        List<Integer> stockAssetList = accountStockList.stream().map(accountStock -> {
            int price = accountStock.getStock().getPrice();
            int amount = accountStock.getAmount();
            return price * amount;
        }).collect(Collectors.toList());
        int stockAsset = stockAssetList.stream().mapToInt(Integer::intValue).sum();
        return stockAsset;
    }

    @Override
    public float getTotalValuePLRatio(Long accountId, Long userId) {
        List<AccountStock> accountStockList = accountService.getAccountStockByUserIdAccountId(accountId, userId);

        List<Integer> investList = accountStockList.stream().map(accountStock ->
                accountStock.getPrice() * accountStock.getAmount()).collect(Collectors.toList());

        List<Integer> resultList = accountStockList.stream().map(accountStock ->
                accountStock.getStock().getPrice() * accountStock.getAmount()).collect(Collectors.toList());

        int investSum = investList.stream().mapToInt(Integer::intValue).sum();
        int resultSum = resultList.stream().mapToInt(Integer::intValue).sum();


        return (float) (resultSum - investSum) / (float) investSum * 100;
    }
}
