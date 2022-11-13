package com.motoo.db.repository;


import com.motoo.db.entity.Trading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface TradingRepository extends JpaRepository<Trading,Long> {

    Optional<Trading> findByTradeId(Long tradeId);

    @Transactional
    Optional<Trading> deleteByTradeId(Long tradeId);
}
