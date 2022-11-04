package com.motoo.db.repository;

import com.motoo.db.entity.Sigungu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SigunguRepository extends JpaRepository<Sigungu, Long> {
    Optional<Sigungu> findBySigunguId(Long sigunguId);

}
