package com.motoo.api.service;


import com.motoo.api.request.AccountsStockAddPostReq;
import com.motoo.db.entity.Accounts;
import com.motoo.db.entity.AccountsStock;
import com.motoo.db.entity.Stock;
import com.motoo.db.entity.User;
import com.motoo.db.repository.*;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountsServiceImpl implements AccountsService{


    private final AccountsRepository accountsRepository;
    private final AccountsRepositorySupport accountsRepositorySupport;

    private final AccountsStockRepository accountsStockRepository;
    private final UserRepository userRepository;

    private final AccountsStockRepositorySupport accountsStockRepositorySupport;



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
        return accountsRepositorySupport.findAllAccountsByUserId(userId);
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
    public AccountsStock getByAccountsId(Long accountsId){
        return accountsStockRepository.getReferenceById(accountsId);
    }

    @Override
    public AccountsStock getByAccountsIdAndAccountsStockId(Long accountsId, Long accountsStockId) {
        return null;
    }

    @Override
    public List<AccountsStock> listAccountsStock(Long accountsStockId) {
        return null;
    }

    //    getByAccountsId
//    getByAccountsIdAndAccountsStockId
//    listAccountsStock
    @Override
    public AccountsStock addAccountsStock(AccountsStockAddPostReq accountsStockAddPostReq){
    AccountsStock accountsStock = new AccountsStock();
//    Stock stock = new Stock();
    Accounts accounts = accountsRepository.findByAccountsId(accountsStockAddPostReq.getAccountsId()).orElse(null);
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
//    public AccountsStock addAccountsStock(AccountsStockAddPostReq accountsStockAddPostReq){
//        AccountsStock accountsStock = new AccountsStock();
//        Accounts accounts = accountsRepository.findByAccountsId(accountsStockAddPostReq.getAccountsId()).orElse(null);
//        Long stockId = accountsStockAddPostReq.getStockId();
//
//        accountsStock.createAccountsStock(accounts, );
//
//    }
    @Override
    public long[] getAccountsCount(List<Accounts> accounts) {
        long[] detailCounts = new long[accounts.size()];
        int idx = 0;
        for (Accounts account : accounts) {
            detailCounts[idx++] =accountsStockRepositorySupport.CountByAccountsId(account.getAccountsId());
        }
        return detailCounts;
    }



}
