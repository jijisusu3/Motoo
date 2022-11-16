package com.motoo.api.service;

import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AccountStockService {


    void addStockToAccount(Long userId, Long accountId, Long stockId, int price, int amount);

    int deleteStockInAccount(Long userId, Long accountId, Long stockId);

    List<Long> getAccountStockIdList(Account account);

    AccountStock getAccountStockByUserIdAccountStockId(Long userId, Long AccountStockId);

    //accountStockId 반환
    Long getAccountStockIdByStockId(Long accountId ,Long stockId);

    //이동평균법 적용한 새로운 amount, price
    @Transactional
    void updateAmountPrice(AccountStock accountStock, int amount, int price);

    Long getStockIdByTicker(String ticker);

    List<AccountStock> getAccountStockListByUserIdAccountIdStockId(Long userId, Long accountId, Long stockId);
}


