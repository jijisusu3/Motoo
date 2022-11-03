package com.motoo.db.repository;


import com.motoo.db.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>{

//    private final EntityManager em;
//
//    public AccountsRepository(EntityManager em){
//       this.em = em;
//    }
//
//    public void save(Accounts accounts){
//        em.persist(accounts);
//    }
//
//    public Accounts findAccounts(Long accountsId){
//        return em.find(Accounts.class, accountsId);
//    }
//
////    public List<Accounts> findAllByString(Accounts )
    Optional<Account> findByAccountId(Long accountId);

    @Transactional
    Optional<Account> deleteByAccountId(Long accountId);
}
