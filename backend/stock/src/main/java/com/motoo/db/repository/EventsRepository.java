package com.motoo.db.repository;

import com.motoo.db.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EventsRepository extends JpaRepository<Events, Long> {
    Events findFirstByOrderByEventsIdDesc();
}
