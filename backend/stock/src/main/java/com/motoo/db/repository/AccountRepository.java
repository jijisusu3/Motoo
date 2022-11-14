package com.motoo.db.repository;


import com.motoo.db.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>{



    Optional<Account> findByAccountId(Long accountId);

    @Transactional
    Optional<Account> deleteByAccountId(Long accountId);
}
