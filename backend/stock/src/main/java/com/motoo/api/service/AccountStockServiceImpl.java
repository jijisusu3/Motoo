package com.motoo.api.service;

import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.User;
import com.motoo.db.repository.AccountRepository;
import com.motoo.db.repository.AccountStockRepository;
import com.motoo.db.repository.AccountStockRepositorySupport;
import com.motoo.db.repository.UserRepository;

import java.util.Optional;

public class AccountStockServiceImpl implements AccountStockService{

//    private final AccountStockRepository accountStockRepository;
//    private final UserRepository userRepository;
//
//    private final AccountStockRepositorySupport accountStockRepositorySupport;


    private final AccountStockRepository accountStockRepository;

    public AccountStockServiceImpl(AccountStockRepository accountStockRepository, UserRepository userRepository, AccountStockRepositorySupport accountStockRepositorySupport, Account account, AccountRepository accountRepository) {
        this.accountStockRepository = accountStockRepository;
        this.userRepository = userRepository;
        this.accountStockRepositorySupport = accountStockRepositorySupport;
        this.accountRepository = accountRepository;

    }

    private final UserRepository userRepository;

    private final AccountStockRepositorySupport accountStockRepositorySupport;

    private final AccountRepository accountRepository;



    @Override
    public void addStockToAccount(Long userId, Long accountId, Long stockId, int price, int amount) {
        User user = userRepository.findByUserId(userId).get();
        Optional<Account> account = accountRepository.findByAccountId(accountId);
        Optional<AccountStock> accountStock = accountStockRepositorySupport.

    }
}
