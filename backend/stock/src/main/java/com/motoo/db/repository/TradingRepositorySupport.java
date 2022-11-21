package com.motoo.db.repository;

import com.motoo.db.entity.Trading;
import com.motoo.db.entity.QTrading;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Collections;
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

    public Trading findTradingByUserIdTradeId(Long userId, Long tradeId){
        return jpaQueryFactory.select(qTrading).from(qTrading)
                .where(qTrading.account.user.userId.eq(userId))
                .where(qTrading.tradeId.eq(tradeId))
                .fetchOne();
    }

    public Trading findTradingByUserIdAccountId(Long userId, Long accountId){
        return jpaQueryFactory.select(qTrading).from(qTrading)
                .where(qTrading.account.user.userId.eq(userId))
                .where(qTrading.account.accountId.eq(accountId))
                .fetchOne();
    }

    public List<Trading> findAllTrading(){
         List<Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                .where(qTrading.tr_type.eq(3).or(qTrading.tr_type.eq(4)))
                .fetch();

         if (tradings==null) return Collections.emptyList();
         else return tradings;
    }

    public List<Trading> find4ByUserIdAcountId(Long userId, Long accountId){
        List<Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.tr_type.eq(4))
                        .where(qTrading.account.user.userId.eq(userId))
                        .where(qTrading.account.accountId.eq(accountId))
                        .fetch();
        if (tradings==null) return Collections.emptyList();
        else return tradings;
    }

    //개인 특정계좌 판매됨,구매됨 조회

    public List<Trading> find1Or2ByUserIdAccountId(Long userId, Long accountId){
        List <Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.tr_type.eq(1).or(qTrading.tr_type.eq(2)))
                        .where(qTrading.account.accountId.eq(accountId))
                        .where(qTrading.user.userId.eq(userId))
                        .fetch();
        if (tradings==null) {return Collections.emptyList();}
        else {return tradings;}
    }

    public List<Trading> find1Or2Or5ByUserIdAccountId(Long userId, Long accountId){
        List <Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.tr_type.eq(1).or(qTrading.tr_type.eq(2).or(qTrading.tr_type.eq(5))))
                        .where(qTrading.account.accountId.eq(accountId))
                        .where(qTrading.user.userId.eq(userId))
                        .fetch();
        if (tradings==null) {return Collections.emptyList();}
        else {return tradings;}

    }

    //개인 특정계좌 전부 조회
    public List<Trading> findAllTradingsByUserIdAccountId(Long userId, Long accountId){
        List<Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.account.accountId.eq(accountId))
                        .where(qTrading.user.userId.eq(userId))
                        .orderBy(qTrading.tr_date.desc())
                        .fetch();

        if (tradings==null) {return Collections.emptyList();}
        else {return tradings;}
    }

    public List<Trading> find1ByUserIdAccountId(Long userId, Long accountId){
        List <Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.tr_type.eq(1))
                        .where(qTrading.account.accountId.eq(accountId))
                        .where(qTrading.user.userId.eq(userId))
                        .fetch();
        if (tradings==null) {return Collections.emptyList();}
        else {return tradings;}
    }

    public List<Trading> find2ByUserIdAccountId(Long userId, Long accountId){
        List <Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.tr_type.eq(2))
                        .where(qTrading.account.accountId.eq(accountId))
                        .where(qTrading.user.userId.eq(userId))
                        .fetch();
        if (tradings==null) {return Collections.emptyList();}
        else {return tradings;}
    }

    public List<Trading> find3Or4ByUserIdAccountId(Long userId, Long accountId){
        List<Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.tr_type.eq(3).or(qTrading.tr_type.eq(4)))
                        .where(qTrading.account.accountId.eq(accountId))
                        .where(qTrading.user.userId.eq(userId))
                        .fetch();
        if (tradings ==null) {return Collections.emptyList();}
        else {return tradings;}
    }


    public List<Trading> find5ByUserIdAccountId(Long userId, Long accountId){
        List <Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.tr_type.eq(5))
                        .where(qTrading.account.accountId.eq(accountId))
                        .where(qTrading.user.userId.eq(userId))
                        .fetch();
        if (tradings==null) {return Collections.emptyList();}
        else {return tradings;}
    }

    public List<Trading> find3ByUserIdAcountId(Long userId, Long accountId){
        List <Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.tr_type.eq(3))
                        .where(qTrading.account.accountId.eq(accountId))
                        .where(qTrading.user.userId.eq(userId))
                        .fetch();
        if (tradings==null) {return Collections.emptyList();}
        else {return tradings;}
    }

    public int find3ByUserIdAccountIdTicker(Long userId, Long accountId, String ticker){
        int tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.tr_type.eq(3))
                        .where(qTrading.user.userId.eq(userId))
                        .where(qTrading.account.accountId.eq(accountId))
                        .where(qTrading.ticker.eq(ticker))
                        .fetch().size();
        return tradings;
    }

    public List<Trading> find6And7(){
        List<Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.tr_type.eq(6).or(qTrading.tr_type.eq(7)))
                        .fetch();
        if (tradings==null) {return Collections.emptyList();}
        else {return tradings;}
    }

    public List<Trading>find6And7ByUserIdAccountId(Long userId, Long accountId){
        List<Trading> tradings =
                jpaQueryFactory.select(qTrading).from(qTrading)
                        .where(qTrading.user.userId.eq(userId))
                        .where(qTrading.account.accountId.eq(accountId))
                        .where(qTrading.tr_type.eq(6).or(qTrading.tr_type.eq(7)))
                        .fetch();

        if (tradings==null) {return Collections.emptyList();}
        else {return tradings;}

    }
}
