package com.motoo.db.repository;


import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.QAccountStock;
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
//    QAccountStock qAccountStock = QAccountStock.accountStock;
//
//
//    public Optional<AccountStock> findAccountStockByAccountStockId(Long accountStockId){
//    return null;
//    }
//
//
//    public long CountByAccountsId(Long accountsId){
//        return jpaQueryFactory.selectFrom(qAccountStock)
//                .where(qAccountStock.accounts.accountsId.eq(accountsId)).fetch().size();
//    }

}
