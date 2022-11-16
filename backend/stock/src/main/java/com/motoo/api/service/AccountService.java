package com.motoo.api.service;

import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;

import java.util.List;


public interface AccountService {

    Long createAccount(Long userId, String name);

    Long createSchoolAccount(Long userId);

    List<Account> listAccount(Long userId);

    List<Account> getListByAccountIdUserId(Long accountId, Long userId);

    Account getAccount(Long accountId,Long userId );

    Account getSchoolAccount(Long userId);


    void updateAccount(Account account, String name);

    int deleteAccount(Long accountsId,Long userId);

    //씨드 추가
    void updateSeed(Account account, int seed);

    long[] getAccountCount(List<Account> accounts);

    //메인함수인지 로직
    void updateMainAccount(Account account, boolean main);



    List<AccountStock> getAccountStockByUserId(Long userId);

    List<AccountStock> getAccountStockByUserIdAccountId(Long accountId, Long userId);



    List<AccountStock> listAccountStock(Long accountId);


}
