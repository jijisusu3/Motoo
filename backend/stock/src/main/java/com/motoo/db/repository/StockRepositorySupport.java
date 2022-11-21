package com.motoo.db.repository;


import com.motoo.db.entity.Stock;
import com.motoo.db.entity.QStock;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StockRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    QStock qStock = QStock.stock;
    public Stock findStockByAStockId(Long stockId){
        Stock stock = jpaQueryFactory.select(qStock).from(qStock).where(qStock.stockId.eq(stockId)).fetchOne();
        return stock;
    }

    public Long findStockIdByTicker(String ticker){
        Stock stock = jpaQueryFactory.selectFrom(qStock).where(qStock.ticker.eq(ticker)).fetchOne();
        return stock.getStockId();
    }




}
