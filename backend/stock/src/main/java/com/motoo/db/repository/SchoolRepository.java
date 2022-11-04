package com.motoo.db.repository;

import com.motoo.db.entity.School;
import com.motoo.db.entity.Sigungu;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School, Long> {

}
