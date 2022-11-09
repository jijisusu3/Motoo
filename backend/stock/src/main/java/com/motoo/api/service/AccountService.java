package com.motoo.api.service;

import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.Stock;

import java.util.List;


public interface AccountService {

    Long createAccount(Long userId, String name);

    Long createSchoolAccount(Long userId);

    List<Account> listAccount(Long userId);

    List<Account> getListByAccountIdUserId(Long accountId, Long userId);

    Account getAccount(Long accountId,Long userId );


    void updateAccount(Account account, String name);

    int deleteAccount(Long accountsId,Long userId);

    //씨드 추가
    void updateSeed(Account account, int seed);

    long[] getAccountCount(List<Account> accounts);

//    List<Stock> getStockList(Long userId, Long accountId);
    //accounts Stock 관련


//    AccountStock getAccountStockByAccountId(Long accountId);






    List<AccountStock> getAccountStockByUserId(Long userId);

    List<AccountStock> getAccountStockByUserIdAccountId(Long accountId, Long userId);


    List<AccountStock> getAccountStockByAccountId(Long accountId);

    List<AccountStock> listAccountStock(Long accountId);


}
