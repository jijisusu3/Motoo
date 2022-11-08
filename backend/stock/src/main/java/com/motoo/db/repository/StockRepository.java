package com.motoo.db.repository;

import com.motoo.db.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

//    Optional<Stock> findStockByStockId(Long stockId);
//
//
//    @Transactional
//    Optional<Stock> deleteByStockAccountStockId(Long stockId);



}
