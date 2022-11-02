package com.motoo.api.service;


import com.motoo.api.request.AccountStockAddPostReq;
import com.motoo.db.entity.Accounts;
import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.Stock;
import com.motoo.db.entity.User;
import com.motoo.db.repository.*;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountsServiceImpl implements AccountsService{


    private final AccountsRepository accountsRepository;
    private final AccountsRepositorySupport accountsRepositorySupport;

    private final AccountStockRepository accountStockRepository;
    private final UserRepository userRepository;

    private final AccountStockRepositorySupport accountStockRepositorySupport;



    //계정생성
    @Override
    public void createAccounts(Long userId, String name) {
        Accounts accounts = new Accounts();
        User user = userRepository.findByUserId(userId).get();
        accounts.createAccounts(user, name);
        accountsRepository.save(accounts);
    }


    //계정목록 조회
    @Override
    public List<Accounts> listAccounts(Long userId) {
//        return accountsRepositorySupport.findAllAccountsByUserId(userId);
        User user = userRepository.getById(userId);

        List<Accounts>accounts = user.getAccounts();

        return accounts;
    }

    @Override
    public Accounts getAccounts(Long accountsId, Long userId) {
        return null;
    }

    @Override
    @Transactional
    public void updateAccounts(Accounts accounts, String name) {

    }

    @Override
    @Transactional
    public AccountStock getByAccountsId(Long accountsId){
        return accountStockRepository.getReferenceById(accountsId);
    }

    @Override
    public AccountStock getByAccountsIdAndAccountStockId(Long accountsId, Long accountStockId) {
        return null;
    }

    @Override
    public List<AccountStock> listAccountStock(Long accountStockId) {
        return null;
    }

    //    getByAccountsId
//    getByAccountsIdAndAccountStockId
//    listAccountStock
    @Override
    public AccountStock addAccountStock(AccountStockAddPostReq accountStockAddPostReq){
    AccountStock accountStock = new AccountStock();
//    Stock stock = new Stock();
    Accounts accounts = accountsRepository.findByAccountsId(accountStockAddPostReq.getAccountsId()).orElse(null);
    return null;
    }


    @Override
    public int deleteAccounts(Long userId, Long accountsId) {
        Accounts accounts;
        try {
            accounts = accountsRepository.findByAccountsId(accountsId).get();
//            accounts = accountsRepositorySupport.findAccountsByAccountsIdAndUserId(userId, accountsId).get();

        }catch (Exception e){
            return 0;
        }
        Long accountsNo = accounts.getAccountsId();
        accountsRepository.deleteByAccountsId(accountsNo);
        return 1;


    }

//    @Override
//    public AccountStock addAccountStock(AccountStockAddPostReq accountStockAddPostReq){
//        AccountStock accountStock = new AccountStock();
//        Accounts accounts = accountsRepository.findByAccountsId(accountStockAddPostReq.getAccountsId()).orElse(null);
//        Long stockId = accountStockAddPostReq.getStockId();
//
//        accountStock.createAccountStock(accounts, );
//
//    }
    @Override
    public long[] getAccountsCount(List<Accounts> accounts) {
        long[] detailCounts = new long[accounts.size()];
        int idx = 0;
        for (Accounts account : accounts) {
            detailCounts[idx++] =accountStockRepositorySupport.CountByAccountsId(account.getAccountsId());
        }
        return detailCounts;
    }



}
