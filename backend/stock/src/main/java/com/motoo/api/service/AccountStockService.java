package com.motoo.api.service;

public interface AccountStockService {


    void addStockToAccount(Long userId, Long accountId, Long stockId);


    void addStockToAccount(Long userId, Long accountId, Long stockId, int price, int amount);
}
