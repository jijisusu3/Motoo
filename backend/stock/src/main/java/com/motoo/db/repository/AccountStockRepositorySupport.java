package com.motoo.db.repository;



import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.*;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;



@Repository
@RequiredArgsConstructor
public class AccountStockRepositorySupport {


    private final JPAQueryFactory jpaQueryFactory;

    QAccountStock qAccountStock = QAccountStock.accountStock;

    public AccountStock findAccountStockByUserIdAccountId(Long userId, Long accountId){
        AccountStock accountStock = jpaQueryFactory
                .select(qAccountStock).from(qAccountStock)
                .where(qAccountStock.account.accountId.eq(accountId))
                .where(qAccountStock.account.user.userId.eq(userId)).fetchOne();

        if (accountStock == null) return null;
        return accountStock;
    }


    public List<AccountStock> findAllAccountStockByAccountId(Long accountId){
        List<AccountStock> accountStocks = jpaQueryFactory.
                select(qAccountStock)
                .from(qAccountStock)
                .where(qAccountStock.account.accountId.eq(accountId))
                .fetch();
        if (accountStocks == null) return Collections.emptyList();
        return accountStocks;
    }

    public List<AccountStock> findAllByUserId(Long userId){
        List<AccountStock> accountStocks = jpaQueryFactory.
                select(qAccountStock)
                .from(qAccountStock)
                .where(qAccountStock.account.user.userId.eq(userId))
                .fetch();
        if (accountStocks == null) return Collections.emptyList();
        return accountStocks;

    }


    public List<AccountStock> findAllAccountStockByUserIdAccountId(Long accountId, Long userId){
        List<AccountStock> accountStocks = jpaQueryFactory.
                select(qAccountStock).from(qAccountStock)
                .where(qAccountStock.account.user.userId.eq(userId))
                .where(qAccountStock.account.accountId.eq(accountId))
                .fetch();
        if (accountStocks == null) return Collections.emptyList();
        return accountStocks;
    }



    public long CountByAccountId(Long accountId){
        return jpaQueryFactory.selectFrom(qAccountStock)
                .where(qAccountStock.account.accountId.eq(accountId)).fetchCount();
    }

    public AccountStock findByUserIdAccountId(Long userId, Long accountStockId){
        return jpaQueryFactory.select(qAccountStock).from(qAccountStock)
                .where(qAccountStock.account.user.userId.eq(userId))
                .where(qAccountStock.accountStockId.eq(accountStockId))
                .fetchOne();
    }

    public Long findAccountIdByStockId(Long accountId ,Long stockId){
        Long getAccountStockId =  jpaQueryFactory.select(qAccountStock).from(qAccountStock)
                .where(qAccountStock.account.accountId.eq(accountId))
                .where(qAccountStock.stock.stockId.eq(stockId))
                .fetchOne().getAccountStockId();



        if (getAccountStockId==null) {return null;}
        else {return getAccountStockId;}
    }

    public List<AccountStock> getAccountStockListByUserIdAccountIdStockId(Long userId, Long accountId, Long stockId){
        List<AccountStock> accountStocks = jpaQueryFactory.select(qAccountStock).from(qAccountStock)
                .where(qAccountStock.account.user.userId.eq(userId))
                .where(qAccountStock.account.accountId.eq(accountId))
                .where(qAccountStock.stock.stockId.eq(stockId))
                .fetch();
        if (accountStocks ==null){
            return Collections.emptyList();
        }
        else {
            return accountStocks;
        }
    }


}
