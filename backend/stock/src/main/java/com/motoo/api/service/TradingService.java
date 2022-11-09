package com.motoo.api.service;


import com.motoo.db.entity.Trading;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;



public interface TradingService {


    //주문하기
    void writeOrder(Long userId, Long accountId, Long stockId, int tr_type, int price, int amount, Integer tr_avg);

    //주문목록조회
    List<Trading> tradingList(Long userId);


    //주문목록조회 1(판매됨) or 2(구매됨)
    List<Trading> tradingList1Or2(Long userId, Long accountId);

    //주문목록조회 전부
    List<Trading> tradingListAccount(Long userId, Long accountId);



    //주문 객체조회
    Trading getTrading(Long userId, Long tradeId);

    Trading getTradingByUserIdAccountId(Long userId, Long accountId);

    //주문 수정
    @Transactional
    void updateOrder(Trading trading, int tr_price, int tr_amount);

    //주문 타입 수정정
    @Transactional
    void updateType(Trading trading, int tr_type);

    //판매시 평단가 저장
    @Transactional
    void writeAvg(Trading trading, int tr_avg);

    //주문 삭제
    int deleteOrder(Long userId, Long tradeId );



}
