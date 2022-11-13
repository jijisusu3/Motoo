package com.motoo.db.repository;

import com.motoo.db.entity.QSchool;
import com.motoo.db.entity.School;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SchoolRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;

    QSchool qSchool = QSchool.school;

    public List<School> findGameSchool(){
        return jpaQueryFactory.select(qSchool).from(qSchool)
                .where(qSchool.users.isNotEmpty()).fetch();
    }


}
