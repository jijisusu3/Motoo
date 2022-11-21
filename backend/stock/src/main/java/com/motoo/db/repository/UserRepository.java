package com.motoo.db.repository;

import com.motoo.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {



    Optional<User> findByUserId(Long userId);

    Optional<User> findByEmail(String email);


    @Transactional
    Optional<User> deleteByUserId(Long userId);


}
