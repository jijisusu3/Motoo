package com.motoo.api.service;

import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.Stock;
import com.motoo.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountStockServiceImpl implements AccountStockService{


    private final AccountStockRepository accountStockRepository;
    private final StockRepository stockRepository;

    private final StockRepositorySupport stockRepositorySupport;
    private final AccountRepositorySupport accountRepositorySupport;
    private final AccountStockRepositorySupport accountStockRepositorySupport;




    @Override
    public void addStockToAccount(Long userId, Long accountId, Long stockId, int price, int amount) {
        Account account = accountRepositorySupport.findAccountByAccountIdAndUserId(accountId, userId);
        Stock stock = stockRepository.findById(stockId).orElseGet(() -> new Stock());
        AccountStock build = AccountStock.builder().account(account).stock(stock)
                .price(price)
                .amount(amount)
                .build();
        accountStockRepository.save(build);
    }

    @Override
    public int deleteStockInAccount(Long userId, Long accountId, Long stockId) {
        Account account = accountRepositorySupport.findAccountByAccountIdAndUserId(accountId, userId);
        Stock stock = stockRepository.findById(stockId).orElseGet(() -> new Stock());
        AccountStock test = accountStockRepository.findByAccountAndStock(account, stock).orElseGet(() -> new AccountStock());
        accountStockRepository.delete(test);
        return 0;
    }
    @Override
    public List<Long> getAccountStockIdList(Account account) {
        List<Long> accountStockIdList = account.getAccountStocks().stream().map(accountStock ->
                accountStock.getStock().getStockId()).collect(Collectors.toList());
        return accountStockIdList;
    }

    @Override
    public AccountStock getAccountStockByUserIdAccountStockId(Long userId, Long accountStockId){
        AccountStock accountStock =  accountStockRepositorySupport.findByUserIdAccountId(userId, accountStockId);
        return accountStock;
    }

    @Override
    public Long getAccountStockIdByStockId(Long accountId ,Long stockId){
        Long accountStockId  = accountStockRepositorySupport.findAccountIdByStockId(accountId ,stockId);
        return accountStockId;
    }
    @Override
    @Transactional
    public void updateAmountPrice(AccountStock accountStock,int amount, int price){
        accountStock.updateAccountStockAmountPrice(amount, price);

    }
    @Override
    public Long getStockIdByTicker(String ticker){
        Long stockId = stockRepositorySupport.findStockIdByTicker(ticker);

        return stockId;
    }
    @Override
    public List<AccountStock>getAccountStockListByUserIdAccountIdStockId(Long userId, Long accountId, Long stockId){
        List<AccountStock> accountStocks = accountStockRepositorySupport.getAccountStockListByUserIdAccountIdStockId(userId,accountId,stockId);
        return accountStocks;
    }
}
