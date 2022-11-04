package com.motoo.db.repository;

import com.motoo.db.entity.Sigungu;

import java.util.Optional;

public interface SigunguRepository {
    Optional<Sigungu> findBySigunguId(Long sigunguId);

}
