package com.motoo.api.service;


import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.User;
import com.motoo.db.repository.AccountRepository;
import com.motoo.db.repository.AccountRepositorySupport;
import com.motoo.db.repository.AccountStockRepositorySupport;
import com.motoo.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{


    private final AccountRepository accountRepository;
    private final AccountRepositorySupport accountRepositorySupport;

    private final UserRepository userRepository;

    private final AccountStockRepositorySupport accountStockRepositorySupport;


    //계정생성
    @Override
    public Long createAccount(Long userId, String name) {
        Account account = new Account();
        User user = userRepository.findByUserId(userId).get();
        account.createAccount(user, name);
        account.updateSeed(20000000);

        accountRepository.save(account);

        return account.getAccountId();

    }

    @Override
    public Long createSchoolAccount(Long userId) {
        Account account = new Account();
        User user = userRepository.findByUserId(userId).get();
        account.createSchoolAccount(user);
        account.updateSeed(20000000);
        accountRepository.save(account);
        return account.getAccountId();

    }




    //계정목록 조회
    @Override
    public List<Account> listAccount(Long userId) {
        return accountRepositorySupport.findAllAccountByUserId(userId);

    }

    @Override
    public List<Account> getListByAccountIdUserId(Long accountId, Long userId) {
        return accountRepositorySupport.findAllAccountByAccountIdUserId(accountId, userId);
    }

    @Override
    public Account getAccount(Long accountId, Long userId) {
        return accountRepositorySupport.findAccountByAccountIdAndUserId(accountId, userId);
    }

    @Override
    public Account getSchoolAccount(Long userId) {
        return accountRepositorySupport.findAccountBySchoolAndUserId(userId);

    }

    @Override
    @Transactional
    public void updateAccount(Account account, String name) {

        account.updateAccountName(name);

    }

    @Override
    @Transactional
    public void updateSeed(Account account, int seed){
        int OldSeed = account.getSeed();
        int NewSeed = OldSeed += seed;
        account.updateSeed(NewSeed);
    }


    @Override
    public List<AccountStock> getAccountStockByUserIdAccountId(Long accountId,Long userId){
        return accountStockRepositorySupport.findAllAccountStockByUserIdAccountId(accountId, userId);
    }

    @Override
    public List<AccountStock> getAccountStockByAccountId(Long accountId) {
        return null;
    }


    @Override
    public List<AccountStock> getAccountStockByUserId(Long userId) {
        return null;
    }


    @Override
    public List<AccountStock> listAccountStock(Long accountId) {
        return accountStockRepositorySupport.findAllAccountStockByAccountId(accountId);
    }


    @Override
    public int deleteAccount( Long accountId,Long userId) {
        Account account;
        try {
            account = accountRepository.findByAccountId(accountId).get();
//            accounts = accountsRepositorySupport.findAccountsByAccountsIdAndUserId(userId, accountsId).get();

        }catch (Exception e){
            return 0;
        }
        Long accountsNo = account.getAccountId();
        accountRepository.deleteByAccountId(accountsNo);
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
    public long[] getAccountCount(List<Account> accounts) {
        long[] detailCounts = new long[accounts.size()];
        int idx = 0;
        for (Account account : accounts) {
            detailCounts[idx++] =accountStockRepositorySupport.CountByAccountId(account.getAccountId());
        }
        return detailCounts;
    }

    @Override
    public void updateMainAccount(Account account, boolean main){
        account.updateIsMain(main);




    }

}
