package com.motoo.db.repository;

import com.motoo.db.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Long countBy();
}
