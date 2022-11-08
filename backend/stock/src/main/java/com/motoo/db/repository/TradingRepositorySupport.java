package com.motoo.db.repository;

import com.motoo.db.entity.Trading;
import com.motoo.db.entity.QTrading;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@RequiredArgsConstructor
public class TradingRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    QTrading qTrading = QTrading.trading;


    public List<Trading> findAllTradingListByUserId(Long userId){
        return jpaQueryFactory.select(qTrading).from(qTrading)
                .where(qTrading.account.user.userId.eq(userId))
                .orderBy(qTrading.tr_date.desc()).fetch();
    }

    public Trading findTradingByUserIdAccountId(Long userId, Long tradeId){
        return jpaQueryFactory.select(qTrading).from(qTrading)
                .where(qTrading.account.user.userId.eq(userId))
                .where(qTrading.tradeId.eq(tradeId))
                .fetchOne();
    }

    public List<Trading> findAllTrading(){
         List<Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                .where(qTrading.tr_type.eq(3).or(qTrading.tr_type.eq(4)))
                .fetch();

         if (tradings==null) return null;
         else return tradings;
    }
}
