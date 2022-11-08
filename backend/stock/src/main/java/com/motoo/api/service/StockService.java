package com.motoo.api.service;

import com.motoo.db.entity.Stock;

public interface StockService {

    Stock getStock(Long stockId);
}
