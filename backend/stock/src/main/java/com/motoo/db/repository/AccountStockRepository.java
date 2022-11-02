package com.motoo.db.repository;

import com.motoo.db.entity.AccountStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface AccountStockRepository  extends JpaRepository<AccountStock, Long> {

    Optional<AccountStock> findByAccountStockId(Long accountStockId);

    @Transactional
    Optional<AccountStock> deleteByAccountStockId(Long accountStockId);

}
