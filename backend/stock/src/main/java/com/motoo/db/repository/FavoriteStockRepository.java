package com.motoo.db.repository;

import com.motoo.db.entity.Stock;
import com.motoo.db.entity.User;
import com.motoo.db.entity.FavoriteStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteStockRepository extends JpaRepository<FavoriteStock, Long> {

    Optional<FavoriteStock> findByUser(User user);
    Optional<FavoriteStock> findByUserAndStock(User user, Stock stock);
    void deleteByUserAndStock(User user, Stock stock);
}
