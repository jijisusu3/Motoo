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

//    Optional<User> findByid(Long id);
//
//    Optional<User> findByusername(String username);
//
//    Optional<User> findBynickname(String nickname);
//
//    Optional<User> findByusernameAndemail(String username, String email);
//
//    Optional<User> findByusernameAndemailAndid(String username, String email, String id);
//
//    @Transactional
//    Optional<User> deleteById(String id);

}