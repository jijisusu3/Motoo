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
    private final AccountRepositorySupport accountRepositorySupport;
    private final AccountStockRepositorySupport accountStockRepositorySupport;

    @Override
    public void addStockToAccount(Long userId, Long accountId, Long stockId) {

    }

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
//        AccountStock accountStock  =accountStockRepositorySupport.findAccountStockByUserIdAccountId(userId,accountId);
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
    public Long getAccountStockIdByStockId(Long stockId){
        Long accountId  = accountStockRepositorySupport.findAccountIdByStockId(stockId);
        return accountId;
    }
    @Override
    @Transactional
    public void updateAmountPrice(AccountStock accountStock,int amount, int price){
        accountStock.updateAccountStockAmountPrice(amount, price);

    }

    /**
     * public void registerStock(Long userId, Long stockId) {
     *         User user = userRepository.findByUserId(userId).orElseGet(() -> new User());
     *         Stock stock = stockRepository.findById(stockId).orElseGet(() -> new Stock());
     *         FavoriteStock build = FavoriteStock.builder()
     *                 .user(user)
     *                 .stock(stock)
     *                 .build();
     *         favoriteStockRepository.save(build);
     *     }
     *
     *     public void delistStock(Long userId, Long stockId) {
     *         User user = userRepository.findByUserId(userId).orElseGet(() -> new User());
     *         Stock stock = stockRepository.findById(stockId).orElseGet(() -> new Stock());
     *         FavoriteStock test = favoriteStockRepository.findByUserAndStock(user, stock).orElseGet(() -> new FavoriteStock());
     *         favoriteStockRepository.delete(test);
     * //        favoriteStockRepository.deleteByUserAndStock(user, stock);
     *     }
     *
     *
     *
     * //주식 계좌 추가
     *     @Override
     *     public void addStockAccount(Long userId, Long stockId) {
     *         User user = userRepository.findByUserId(userId).orElseGet(() -> new User());
     *         Account account = accountRepositorySupport.findAccountByUserId(userId);
     *
     *
     *         Stock stock = stockRepository.findById(stockId).orElseGet(() -> new Stock());
     *         AccountStock build = AccountStock.builder()
     *                 .account(account)
     *                 .build();
     *     }
     *
     *     //주식 계좌 삭제
     *     @Override
     *     public void deleteStockAccount(Long userId, Long stockId) {
     *
     *     }
     *
     *
     *
     * **/
}
