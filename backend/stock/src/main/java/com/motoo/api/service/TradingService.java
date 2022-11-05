package com.motoo.api.service;


import com.motoo.db.entity.Trading;

import java.util.List;

public interface TradingService {

    void writeOrder(Long userId, Long accountId, int price, int amount);

    List<Trading> tradingList();

    void updateOrder();

    void deleteOrder();


}
