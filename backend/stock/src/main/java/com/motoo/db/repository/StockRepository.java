package com.motoo.db.repository;

import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

//    Optional<AccountStock> findByAccountsId(Long accountsId);
//
//
//    @Transactional
//    Optional<AccountStock> deleteByAccountStockId(Long accountStockId);


}
