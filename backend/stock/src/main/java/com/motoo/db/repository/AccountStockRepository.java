package com.motoo.db.repository;

import com.motoo.db.entity.Stock;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountStockRepository  extends JpaRepository<AccountStock, Long> {


    List<AccountStock> findByAccountStockId(Long accountStockId);



    Optional <AccountStock> findByAccountAndStock(Account account, Stock stock);



}
