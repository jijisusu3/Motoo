package com.motoo.api.service;

import com.motoo.db.entity.FavoriteStock;
import com.motoo.db.entity.Stock;
import com.motoo.db.entity.User;
import com.motoo.db.repository.FavoriteStockRepository;
import com.motoo.db.repository.StockRepository;
import com.motoo.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class FavoriteStockService {
    private final UserRepository userRepository;
    private final StockRepository stockRepository;
    private final FavoriteStockRepository favoriteStockRepository;

    public List<Long> getFavoriteStockIdList(User user) {
        List<Long> favoriteStockIdList = user.getFavoriteStocks().stream().map(favoriteStock ->
                favoriteStock.getStock().getStockId()).collect(Collectors.toList());
        return favoriteStockIdList;
    }

    public List<String> getFavoriteStockCodeList(User user) {
        List<String> favoriteStockCodeList = user.getFavoriteStocks().stream().map(favoriteStock ->
                favoriteStock.getStock().getTicker()).collect(Collectors.toList());
        return favoriteStockCodeList;
    }

    public void registerStock(Long userId, Long stockId) {
        User user = userRepository.findByUserId(userId).orElseGet(() -> new User());
        Stock stock = stockRepository.findById(stockId).orElseGet(() -> new Stock());
        FavoriteStock build = FavoriteStock.builder()
                .user(user)
                .stock(stock)
                .build();
        favoriteStockRepository.save(build);
    }

    public void delistStock(Long userId, Long stockId) {
        User user = userRepository.findByUserId(userId).orElseGet(() -> new User());
        Stock stock = stockRepository.findById(stockId).orElseGet(() -> new Stock());
        FavoriteStock test = favoriteStockRepository.findByUserAndStock(user, stock).orElseGet(() -> new FavoriteStock());
        favoriteStockRepository.delete(test);

    }
}
