package com.motoo.api.service;

import com.motoo.api.request.AccountsStockAddPostReq;
import com.motoo.db.entity.Accounts;
import com.motoo.db.entity.AccountsStock;

import java.util.List;


public interface AccountsService {

    void createAccounts(Long userId, String name);

    List<Accounts> listAccounts(Long userId);

    Accounts getAccounts(Long userId , Long accountsId );


    void updateAccounts(Accounts accounts, String name);

    int deleteAccounts(Long userId,Long accountsId);


    long[] getAccountsCount(List<Accounts> accounts);


    //accounts Stock 관련
    AccountsStock addAccountsStock(AccountsStockAddPostReq accountsStockAddPostReq);

    AccountsStock getByAccountsId(Long accountsId);

    AccountsStock getByAccountsIdAndAccountsStockId(Long accountsId, Long accountsStockId);

    List<AccountsStock> listAccountsStock(Long accountsStockId);




}
