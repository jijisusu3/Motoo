package com.motoo.api.service;

import com.motoo.api.request.AccountsStockAddPostReq;
import com.motoo.db.entity.Accounts;
import com.motoo.db.entity.AccountsStock;

import java.util.List;


public interface AccountsService {

    void createAccounts(Long userId, String name);

    List<Accounts> listAccounts(Long id);

    Accounts getAccounts(Long accountsId, Long userId);


    void updateAccounts(Accounts accounts, String name);

    int deleteAccounts(Long accountsId);



    AccountsStock addAccountsStock(AccountsStockAddPostReq accountsStockAddPostReq);

    AccountsStock getByStockId(Long userId);

    AccountsStock getByAccountsAndStockId(Long stockId);

    List<AccountsStock> listAccountsStock(Long accountsId);

    void updateAccounts(AccountsStock accountsStock, AccountsStockAddPostReq accountsStockAddPostReq);

    int deleteAccountsStock(Long accountsId);

    long[] getAccountsCount(List<Accounts> accounts);

}
