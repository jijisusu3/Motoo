package com.motoo.db.repository;


import com.motoo.db.entity.Accounts;
import com.motoo.db.entity.QAccounts;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AccountsRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    QAccounts qAccounts = QAccounts.accounts;


    public List<Accounts> findAllAccountsByUserId(Long userId){
        return jpaQueryFactory.select(qAccounts).from(qAccounts)
                .where(qAccounts.user.userId.eq(userId)).fetch();
    }

    public Accounts findAccountsByAccountsIdAndUserId(Long accountsId, Long userId){
        return jpaQueryFactory.select(qAccounts).from(qAccounts)
                .where(qAccounts.accountsId.eq(accountsId))
                .where(qAccounts.user.userId.eq(userId)).fetchOne();
    }
}
