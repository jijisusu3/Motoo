package com.motoo.db.repository;

import com.motoo.db.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SchoolRepository extends JpaRepository<School, Long> {

}
