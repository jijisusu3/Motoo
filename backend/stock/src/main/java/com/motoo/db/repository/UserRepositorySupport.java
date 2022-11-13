package com.motoo.db.repository;

import com.motoo.db.entity.QUser;
import com.motoo.db.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;

    QUser qUser = QUser.user;

    public List<User> findAllUserBySchool(){
        return jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.school.isNotNull()).fetch();
    }


}
