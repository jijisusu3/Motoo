package com.motoo.api.service;

import com.motoo.db.entity.Stock;
import com.motoo.db.repository.StockRepository;
import com.motoo.db.repository.StockRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    StockRepository stockRepository;
    StockRepositorySupport stockRepositorySupport;

    @Override
    public Stock getStock(Long stockId) {
        return stockRepositorySupport.findStockByAStockId(stockId);
    }

    @Override
    public List<Stock> getStockListByTicker(String ticker) {
        return null;
    }

    @Override
    public Long getStockIdByTicker(String ticker){
        return stockRepositorySupport.findStockIdByTicker(ticker);
    }
}
