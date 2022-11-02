package com.motoo.db.repository;


import com.motoo.db.entity.Account;
import com.motoo.db.entity.QAccount;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AccountRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

//    QAccount qAccount = QAccount.accounts;
    QAccount qAccount = QAccount.account;

//    EntityManager em = createEnti
    JPAQuery jpaQuery = new JPAQuery();


    public List<Account> findAllAccountByUserId(Long userId){
        return jpaQueryFactory.select(qAccount).from(qAccount)
                .where(qAccount.user.userId.eq(userId)).fetch();


//        return jpaQueryFactory.selectFrom(qAccount).where(qAccount.user.userId.eq(userId)).fetch();

//        return jpaQueryFactory.select(qAccount).where(qAccount.user.userId.eq(userId)).from(qAccount).fetch();

    }



    public Account findAccountByAccountIdAndUserId(Long accountId, Long userId){
        return jpaQueryFactory.select(qAccount).from(qAccount)
                .where(qAccount.accountId.eq(accountId))
                .where(qAccount.user.userId.eq(userId)).fetchOne();
    }
}
