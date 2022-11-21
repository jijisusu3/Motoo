package com.motoo.batch;




//4시 이후 체결이 되지 않은 주문들을 모두 삭제


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
public class OrderDeleteBatchAfter4PM {


    private final TradingService tradingService;

    public OrderDeleteBatchAfter4PM(TradingService tradingService) {
        this.tradingService = tradingService;
    }
    //초분시일월주
    @Scheduled(cron = " 0 30 16 * * MON-FRI ")
    public void timeScheduleAfter4Pm() {
        List<Trading> tradingLists = tradingService.tradingList3Or4WillBeChange();
        if (tradingLists == null) {
            return;
        } else {
            for (int j = 0; j < tradingLists.size(); j++) {

                if ( tradingLists.get(j).getTr_type()==3){
                //주문 유저번호
                Long userId =  tradingLists.get(j).getUser().getUserId();

                //주문 번호
                Long tradeId = tradingLists.get(j).getTradeId();

                //주문 객체
                Trading trading = tradingService.getTrading(userId, tradeId);

                //판매미수 타입은 6
                trading.updateType(6);

                }
                else {

                    //주문 유저번호
                    Long userId =  tradingLists.get(j).getUser().getUserId();

                    //주문 번호
                    Long tradeId = tradingLists.get(j).getTradeId();

                    //주문 객체
                    Trading trading = tradingService.getTrading(userId, tradeId);

                    //구매미수 타입은 7
                    trading.updateType(7);
                }
            }
        }
    }

}
