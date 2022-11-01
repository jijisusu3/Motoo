package com.motoo.db.repository;



import com.motoo.db.entity.AccountsStock;

import com.motoo.db.entity.QAccountsStock;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
@RequiredArgsConstructor
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


    public List<AccountsStock> findAllAccountsStockByAccountsId(Long accountsId){
        List<AccountsStock> accountsStocks = jpaQueryFactory.
                select(qAccountsStock).from(qAccountsStock)
                .where(qAccountsStock.accounts.accountsId.eq(accountsId)).fetch();
        if (accountsStocks == null) return null;
        return accountsStocks;
        
    }

    public long CountByAccountsId(Long accountsId){
        return jpaQueryFactory.selectFrom(qAccountsStock)
                .where(qAccountsStock.accounts.accountsId.eq(accountsId)).fetch().size();
    }

}
