package com.motoo.api.service;


import com.motoo.db.entity.Account;
import com.motoo.db.entity.Trading;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;



public interface TradingService {


    //주문하기
    void writeOrder(Long userId, Long accountId, Long stockId, int tr_type, int price, int amount);

    //주문목록조회
    List<Trading> tradingList(Long userId);

    //주문 객체조회
    Trading getTrading(Long userId, Long tradeId);


    //주문 수정
    @Transactional
    void updateOrder(Trading trading, int tr_price, int tr_amount);


    //주문 삭제
    int deleteOrder(Long userId, Long tradeId );



}
