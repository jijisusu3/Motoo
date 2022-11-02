package com.motoo.api.service;

import com.motoo.api.request.AccountStockAddPostReq;
import com.motoo.db.entity.Accounts;
import com.motoo.db.entity.AccountStock;

import java.util.List;


public interface AccountsService {

    void createAccounts(Long userId, String name);

    List<Accounts> listAccounts(Long userId);

    Accounts getAccounts(Long userId , Long accountsId );


    void updateAccounts(Accounts accounts, String name);

    int deleteAccounts(Long userId,Long accountsId);


    long[] getAccountsCount(List<Accounts> accounts);


    //accounts Stock 관련
    AccountStock addAccountStock(AccountStockAddPostReq accountStockAddPostReq);

    AccountStock getByAccountsId(Long accountsId);

    AccountStock getByAccountsIdAndAccountStockId(Long accountsId, Long accountStockId);

    List<AccountStock> listAccountStock(Long accountStockId);




}
