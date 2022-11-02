package com.motoo.db.repository;



import com.motoo.db.entity.AccountStock;

import com.motoo.db.entity.QAccountStock;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
@RequiredArgsConstructor
public class AccountStockRepositorySupport {


    private JPAQueryFactory jpaQueryFactory;

    QAccountStock qAccountStock = QAccountStock.accountStock;

    public Optional<AccountStock> getFindAccountStockByAccountsId(Long accountId, Long stockId){
        AccountStock accountStock = jpaQueryFactory.select(qAccountStock)
                .from(qAccountStock)
                .where(qAccountStock.account.accountId.eq(accountId))
                .where(qAccountStock.accountStockId.eq(stockId)).fetchOne();
            if (accountStock ==null) return Optional.empty();
            return Optional.ofNullable(accountStock);
    }


    public List<AccountStock> findAllAccountStockByAccountsId(Long accountsId){
        List<AccountStock> accountStocks = jpaQueryFactory.
                select(qAccountStock).from(qAccountStock)
                .where(qAccountStock.account.accountId.eq(accountsId)).fetch();
        if (accountStocks == null) return null;
        return accountStocks;
        
    }

    public long CountByAccountId(Long accountId){
        return jpaQueryFactory.selectFrom(qAccountStock)
                .where(qAccountStock.account.accountId.eq(accountId)).fetchCount();
    }

}
