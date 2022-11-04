package com.motoo.api.service;

import com.motoo.api.request.AccountStockAddPostReq;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface AccountService {

    void createAccount(Long userId, String name);

    List<Account> listAccount(Long userId);

    List<Account> getListByAccountIdUserId(Long accountId, Long userId);

    Account getAccount(Long accountId,Long userId );


    void updateAccount(Account account, String name);

    int deleteAccount(Long accountsId,Long userId);

    //씨드 추가
    void updateSeed(Account account, int seed);

    long[] getAccountCount(List<Account> accounts);


    //accounts Stock 관련
    AccountStock addAccountStock(AccountStockAddPostReq accountStockAddPostReq);

//    AccountStock getAccountStockByAccountId(Long accountId);

    AccountStock getAccountStockByAccountIdAndAccountStockId(Long accountId, Long accountStockId);




    List<AccountStock> getAccountStockByUserId(Long userId);

    List<AccountStock> getAccountStockByAccountId(Long accountId);

    List<AccountStock> listAccountStock(Long accountId);




}
