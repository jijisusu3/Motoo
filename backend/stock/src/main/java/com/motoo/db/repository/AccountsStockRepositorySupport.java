package com.motoo.db.repository;



import com.motoo.db.entity.AccountsStock;

import com.motoo.db.entity.QAccountsStock;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.Optional;

public class AccountsStockRepositorySupport {


    private JPAQueryFactory jpaQueryFactory;

    QAccountsStock qAccountsStock = QAccountsStock.accountsStock;

    public Optional<AccountsStock> getFindAccountsStockByAccountsId(Long accountId, Long stockId){
        AccountsStock accountsStock = jpaQueryFactory.select(qAccountsStock)
                .from(qAccountsStock)
                .where(qAccountsStock.accounts.accountsId.eq(accountId))
                .where(qAccountsStock.accountsStockId.eq(stockId)).fetchOne();
            if (accountsStock ==null) return Optional.empty();
            return Optional.ofNullable(accountsStock);
    }


    public Optional<AccountsStock> findAccountsStockByAccountsId;

}
