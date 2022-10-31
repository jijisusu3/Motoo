package com.motoo.api.service;

import com.motoo.db.entity.Accounts;

import java.util.List;


public interface AccountsService {

    void createAccounts(Long userId, String name);

    List<Accounts> listAccounts(Long id);

    Accounts getAccounts(Long accountsId, Long userId);

    void updateAccounts(Accounts accounts, String name);

    int deleteAccounts(Long accountsId);


}
