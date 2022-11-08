package com.motoo.batch;


import com.motoo.api.service.AccountService;
import com.motoo.api.service.AccountStockService;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.Stock;
import com.motoo.db.entity.Trading;
import com.motoo.db.repository.StockRepositorySupport;
import com.motoo.db.repository.TradingRepositorySupport;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Transactional
public class OrderExcution {


    private final TradingRepositorySupport tradingRepositorySupport;
    private final AccountService accountService;
    private final AccountStockService accountStockService;
    private final StockRepositorySupport stockRepositorySupport;
    public OrderExcution(TradingRepositorySupport tradingRepositorySupport, AccountService accountService, AccountStockService accountStockService, StockRepositorySupport stockRepositorySupport) {
        this.tradingRepositorySupport = tradingRepositorySupport;
        this.accountService = accountService;
        this.accountStockService = accountStockService;
        this.stockRepositorySupport = stockRepositorySupport;
    }

//    @Scheduled(cron = " 5 * * * * * ")
    public void timeSchedule(){

        //3,4 인 거래계좌 리스트
        List<Trading> tradingList = tradingRepositorySupport.findAllTrading();
        for (int i = 0; i<tradingList.size(); i++){

            //3,4인 사람의 accountId
            Long accountId = tradingList.get(i).getAccount().getAccountId();
            if (accountId == null) {break;}
            else {
                //3,4인 사람의 userId
                Long userId =  tradingList.get(i).getUser().getUserId();

                //주식 번호
                String ticker = tradingList.get(i).getTicker();

                //계좌 객체
                Account account = accountService.getAccount(accountId, userId);

                int amount = tradingList.get(i).getTr_amount();
                int price = tradingList.get(i).getTr_price();

                List<Long> stockList = accountStockService.getAccountStockIdList(account);

                Long stockId = accountStockService.getStockIdByTicker(ticker);



                //지금 주식 가격이랑 내 주문량, 가격이랑 비교
                Stock stock =stockRepositorySupport.findStockByAStockId(stockId);

                //이전 주식가격
                int pre_price = stock.getPrice();

                //주식을 살 수 있을 때 분기
                if (amount*price >= amount*pre_price){

                 //계좌에 해당 주식이 있는경우 분기
                    if (stockList.contains(stockId)) {
                        //accountStock
                        List<AccountStock> accountStocks = accountService.getAccountStockByUserIdAccountId(accountId,userId);
                        Long accountStockId = accountStockService.getAccountStockIdByStockId(account.getAccountId(),stockId);



                        AccountStock accountStock = accountStockService.getAccountStockByUserIdAccountStockId(userId, accountStockId);
                        int currentAmount = accountStock.getAmount();
                        int currentPrice = accountStock.getPrice();
                        System.out.println(currentAmount);
                        System.out.println(currentPrice);
                        //이동평균법에 의한 새로운 가격
                        int newPrice = (currentPrice*currentAmount + price*amount)/(currentAmount+amount);
                        int newAmount = currentAmount + amount;
                        System.out.println(newAmount);
                        System.out.println(newPrice);





                        accountStockService.updateAmountPrice(accountStock, newAmount, newPrice);



                        System.out.println("주식이 체결됐습니다.");

                     }
                    else {
                        //계좌 주식 리스트에 해당 주식이 없으면 주식 등록
                        accountStockService.addStockToAccount(userId, accountId, stockId, price, amount);
                        System.out.println("주식이 체결됐습니다.");
                             }
                        }

                //주식을 살 수 없음음
                else {
                        System.out.println("주식이 체결되지 않았습니다.");
                      continue;
                     }

            }

                    }
    }
}

