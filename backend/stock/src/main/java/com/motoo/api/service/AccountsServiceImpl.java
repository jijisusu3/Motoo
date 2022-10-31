package com.motoo.api.service;


import com.motoo.db.entity.Accounts;
import com.motoo.db.entity.AccountsStock;
import com.motoo.db.repository.AccountsRepository;
import com.motoo.db.repository.AccountsRepositorySupport;
import com.motoo.db.repository.AccountsStockRepositorySupport;
import com.motoo.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountsServiceImpl implements AccountsService{


    private final AccountsRepository accountsRepository;

    private final AccountsStock accountsStock;

    private final UserRepository userRepository;

    private final AccountsStockRepositorySupport accountsStockRepositorySupport;

    private final AccountsRepositorySupport accountsRepositorySupport;

    public void createAccounts(Long userId, String name) {

    }

    @Override
    public List<Accounts> listAccounts(Long id) {
        return null;
    }

    @Override
    public Accounts getAccounts(Long accountsId, Long userId) {
        return null;
    }

    @Override
    public void updateAccounts(Accounts accounts, String name) {

    }

    @Override
    public int deleteAccounts(Long accountsId) {

    }


}
