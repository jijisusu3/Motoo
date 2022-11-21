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


    //거래 체결전의 본인의 거래목록 조회
    List<Trading> tradingList3Or4(Long userId, Long accountId);

    //전날 미체결된 본인의 거래목록 조회
    List<Trading> tradingList6Or7FindByUserAccountId(Long userId, Long accountId);

    //판매하고 있는 본인 거래내역 조회
    List<Trading> tradingList3(Long userId, Long accountId);

    //개인이 주문 보낸 주문 리스트
    List<Trading> tradingList4(Long userId, Long accountId);


    //판매가능한 갯수 확인용용
    int tradingList3ByTicker(Long userId, Long accountId, String ticker);

    //체결되지 않은 주문 리스트
    List<Trading> tradingList3Or4WillBeChange();

    //전날 미수 됐던 주문 리스트
    List<Trading> tradingList6Or7WillBeDelete();

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
