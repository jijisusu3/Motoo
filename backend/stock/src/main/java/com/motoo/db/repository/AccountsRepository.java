package com.motoo.db.repository;


import com.motoo.db.entity.Accounts;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountsRepository {

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
    Optional<Accounts> findByAccountsId(Long accountsId);

    @Transactional
    Optional<Accounts> deleteByAccountsId(Long accountsId);
}
