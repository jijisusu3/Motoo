package com.motoo.db.repository;

import com.motoo.db.entity.AccountStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountStockRepository  extends JpaRepository<AccountStock, Long> {

    List<AccountStock> findByAccountStockId(Long accountStockId);


//    List<AccountStock> findByAccountStock_AccountId(Long accountId);


    @Transactional
    Optional<AccountStock> deleteByAccountStockId(Long accountStockId);

}
