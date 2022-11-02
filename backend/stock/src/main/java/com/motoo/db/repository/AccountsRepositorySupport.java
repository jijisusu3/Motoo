package com.motoo.db.repository;


import com.motoo.db.entity.Accounts;
import com.motoo.db.entity.QAccounts;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class AccountsRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

//    QAccounts qAccounts = QAccounts.accounts;
    QAccounts qAccounts = QAccounts.accounts;

//    EntityManager em = createEnti
    JPAQuery jpaQuery = new JPAQuery();


    public List<Accounts> findAllAccountsByUserId(Long userId){
        return jpaQueryFactory.select(qAccounts).from(qAccounts)
                .where(qAccounts.user.userId.eq(userId)).fetch();


//        return jpaQueryFactory.selectFrom(qAccounts).where(qAccounts.user.userId.eq(userId)).fetch();

//        return jpaQueryFactory.select(qAccounts).where(qAccounts.user.userId.eq(userId)).from(qAccounts).fetch();

    }



    public Accounts findAccountsByAccountsIdAndUserId(Long accountsId, Long userId){
        return jpaQueryFactory.select(qAccounts).from(qAccounts)
                .where(qAccounts.accountsId.eq(accountsId))
                .where(qAccounts.user.userId.eq(userId)).fetchOne();
    }
}
