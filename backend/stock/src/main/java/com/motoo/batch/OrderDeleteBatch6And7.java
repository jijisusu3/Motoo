package com.motoo.batch;



//이틀 간격으로 미수된 것들 변경해주기
//전전날 미체결된 주식들 삭제

import com.motoo.api.service.TradingService;
import com.motoo.db.entity.Trading;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Transactional
@Slf4j
public class OrderDeleteBatch6And7 {

    private final TradingService tradingService;


    public OrderDeleteBatch6And7(TradingService tradingService) {
        this.tradingService = tradingService;
    }

    //초분시일월주
    @Scheduled(cron = " 0 30 16 * * FRI ")
    public void timeScheduleAfterOneDay(){
        List<Trading> tradingList =  tradingService.tradingList6Or7WillBeDelete();
        for (int i=0; i<tradingList.size(); i++){
            Long userId =  tradingList.get(i).getUser().getUserId();

            //주문 번호
            Long tradeId = tradingList.get(i).getTradeId();

            //주문 객체
            Trading trading = tradingService.getTrading(userId, tradeId);

            //조회 할 수 없는 타입은 8
            trading.updateType(8);


        }



    }
}
