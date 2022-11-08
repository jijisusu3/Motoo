package com.motoo.api.service;

import com.motoo.db.entity.Stock;
import com.motoo.db.repository.StockRepository;
import com.motoo.db.repository.StockRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    StockRepository stockRepository;
    StockRepositorySupport stockRepositorySupport;

    @Override
    public Stock getStock(Long stockId) {
        return stockRepositorySupport.findStockByAStockId(stockId);
    }
}
