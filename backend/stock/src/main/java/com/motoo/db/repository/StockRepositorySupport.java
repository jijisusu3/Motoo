package com.motoo.db.repository;


import com.motoo.db.entity.AccountsStock;
import com.motoo.db.entity.QAccountsStock;
import com.motoo.db.entity.QStock;
import com.motoo.db.entity.Stock;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class StockRepositorySupport {

//    private final JPAQueryFactory jpaQueryFactory;
//
//    QAccountsStock qAccountsStock = QAccountsStock.accountsStock;
//
//
//    public Optional<AccountsStock> findAccountsStockByAccountsStockId(Long accountsStockId){
//    return null;
//    }
//
//
//    public long CountByAccountsId(Long accountsId){
//        return jpaQueryFactory.selectFrom(qAccountsStock)
//                .where(qAccountsStock.accounts.accountsId.eq(accountsId)).fetch().size();
//    }

}
