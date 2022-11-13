package com.motoo.api.service;

import com.motoo.db.entity.Stock;

import java.util.List;

public interface StockService {

    Stock getStock(Long stockId);


    List<Stock> getStockListByTicker(String ticker);

    Long getStockIdByTicker(String ticker);
}
