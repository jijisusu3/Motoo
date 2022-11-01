package com.motoo.db.repository;

import com.motoo.db.entity.AccountsStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface AccountsStockRepository  extends JpaRepository<AccountsStock, Long> {

    Optional<AccountsStock> findByAccountsStockId(Long accountsStockId);

    @Transactional
    Optional<AccountsStock> deleteByAccountsStockId(Long accountsStockId);

}
