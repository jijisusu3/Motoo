package com.motoo.batch;


import com.motoo.api.service.AccountService;
import com.motoo.api.service.AccountStockService;
import com.motoo.api.service.TradingService;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.Stock;
import com.motoo.db.entity.Trading;
import com.motoo.db.repository.AccountStockRepositorySupport;
import com.motoo.db.repository.StockRepositorySupport;
import com.motoo.db.repository.TradingRepositorySupport;

import lombok.extern.slf4j.Slf4j;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
//2분마다 거래내역 조회 후, 거래체결
@Component
@Transactional
@Slf4j
public class OrderExcution {


    private final TradingRepositorySupport tradingRepositorySupport;
    private final AccountService accountService;
    private final AccountStockService accountStockService;
    private final StockRepositorySupport stockRepositorySupport;

    private final TradingService tradingService;


    public OrderExcution(TradingRepositorySupport tradingRepositorySupport, AccountService accountService, AccountStockService accountStockService, StockRepositorySupport stockRepositorySupport, TradingService tradingService) {
        this.tradingRepositorySupport = tradingRepositorySupport;
        this.accountService = accountService;
        this.accountStockService = accountStockService;
        this.stockRepositorySupport = stockRepositorySupport;
        this.tradingService = tradingService;

    }

    //월~금 9시~16시 사이에 2분간격으로 조회
    @Scheduled(cron = " 0 0/2 9-16 * * MON-FRI ")
    public void timeSchedule() {

        //3판매예약,  4구매예약 인 거래계좌 리스트
        List<Trading> tradingList = tradingRepositorySupport.findAllTrading();

        //예약 중인 거래내역이 없는 경우 종료
        if (tradingList.isEmpty()) {
            log.info("예약중인 거래내역이 없습니다.");
            return;
        } else {
            for (int i = 0; i < tradingList.size(); i++) {

                //3,4인 사람의 accountId
                Long accountId = tradingList.get(i).getAccount().getAccountId();

                if (accountId == null) {

                    log.info("예약중인 사람이 없습니다.");
                    break;

                } else {
                    //주문 유저 번호
                    Long userId = tradingList.get(i).getUser().getUserId();

                    //주문 주식 번호
                    String ticker = tradingList.get(i).getTicker();

                    //주문 번호
                    Long tradeId = tradingList.get(i).getTradeId();

                    //주문 거래량, 가격
                    int amount = tradingList.get(i).getTr_amount();
                    int price = tradingList.get(i).getTr_price();

                    //계좌 객체
                    Account account = accountService.getAccount(accountId, userId);

                    //그 계좌의 보유한 스탁 리스트
                    List<Long> stockList = accountStockService.getAccountStockIdList(account);

                    //계좌 종목번호로 해당 스탁Id 가져오기
                    Long stockId = accountStockService.getStockIdByTicker(ticker);

                    //지금 주식 가격이랑 내 주문량, 가격이랑 비교용도의 주식객체
                    Stock stock = stockRepositorySupport.findStockByAStockId(stockId);

                    //트레이딩 타입 바꿔줄 트레이딩의 객체
                    Trading trading = tradingService.getTrading(userId, tradeId);
                    log.info("트레이딩 타입  ",+trading.getTr_type());


                    //accountStockId
//                    Long accountStockId = accountStockService.getAccountStockIdByStockId(accountId, stockId);
//                    AccountStock accountStock = accountStockService.getAccountStockByUserIdAccountStockId(userId, accountStockId);
////
////                    //판매 거래내역에 추가
//                    int original = accountStock.getPrice();
//                    Integer converted = Integer.valueOf(original);
//
//                    trading.setAvg(converted);

                    //판매예약 조회
                    if (tradingList.get(i).getTr_type() == 3) {


                        //accountStockId 가져오기

                        //문제의 그곳 ..



                        //주식 소유여부 분기
                        if (stockList.contains(stockId)){
                            //판매할 금액이 현재 주식가격보다 높을경우 판매불가
                            //accountStockId 가져오기
                            Long accountStockId = accountStockService.getAccountStockIdByStockId(accountId, stockId);
                            //accountStock 객체 가져오기
                            AccountStock accountStock = accountStockService.getAccountStockByUserIdAccountStockId(userId, accountStockId);
                            if(amount*price > amount*stock.getPrice()){
                                log.info("판매가격이 시장가보다 높습니다.");
                                continue;

                            }else {
                            //해당 보유한 주식의 양분기
                                if( accountStock.getAmount()<amount){

                                    log.info("계좌에 해당 양의 주식이 없습니다.");
                                    continue;
                                }else {
//                                List<AccountStock> accountStocks = accountService.getAccountStockByUserIdAccountId(accountStockAddPostReq.getAccountId(),userId);

                                    int currentAmount = accountStock.getAmount();
                                    int currentPrice = accountStock.getPrice();

                                    int newAmount = currentAmount - amount;

                                    Long SellAccountId = account.getAccountId();


                                    //시드머니 변경
                                    accountService.updateSeed(account, + amount * price);

                                    //해당 보유주식 가격, 수량 변경
                                    accountStockService.updateAmountPrice(accountStock, newAmount, currentPrice);
                                    trading.updateType(1);
                                    trading.setAvg(accountStock.getPrice());
                                    //보유주식이 0으로 떨어지면 보유계좌에서 삭제
                                     if (accountStock.getAmount() <=0){
                                         accountStockService.deleteStockInAccount(userId, SellAccountId, stockId);
                                     }
                                    log.info("해당 주식 판매완료");
                                 }
                            }

                        }
                        else{
                                log.info("해당 주식이 없습니다.");
                                continue;
                            }
                    }


                    //구매예약 조회
                    else {
                        //시드머니 조회하여 구매가격이 시드머니보다 높으면 구매가능
                        if (account.getSeed() >= stock.getPrice()*amount){
                            //구매할 금액*양이 현재 주식가격*양 보다 높을경우에 구매가능
                            if(amount*price > amount*stock.getPrice()){
                            //계좌 주식 리스트에 해당 주식이 있으면 주식 평단가 수정
                                if (stockList.contains(stockId)){
                                    //accountStockId 가져오기
                                    Long accountStockId = accountStockService.getAccountStockIdByStockId(accountId, stockId);

                                    //accountStock 객체 가져오기
                                    AccountStock accountStock = accountStockService.getAccountStockByUserIdAccountStockId(userId, accountStockId);

                                    //accountStock 객체 가져오기
//                                  AccountStock accountStock = accountStockService.getAccountStockByUserIdAccountStockId(userId, accountStockId);

                                    //이동평균법에 의한 새로운 가격 계산하는 로직
                                    int currentAmount = accountStock.getAmount();
                                    int currentPrice = accountStock.getPrice();

                                    int newPrice = (currentPrice * currentAmount + price * amount) / (currentAmount + amount);
                                    int newAmount = currentAmount + amount;

                                    //시드머니 변경
                                     accountService.updateSeed(account, -(price * amount));
                                     //해당 보유주식 가격, 수량 변경
                                     accountStockService.updateAmountPrice(accountStock, newAmount, newPrice);
                                }
                            //사려는 주식이 계좌에 없는 경우 새로 구매 후 추가
                                 else {
                                     //시드머니 변경
                                     accountService.updateSeed(account, -(price * amount));
                                     accountStockService.addStockToAccount(userId, accountId, stockId, price, amount);
                                }
                                tradingService.updateType(trading,2);
                                log.info("주식이 체결됐습니다.");
                            }else {
                                log.info("구매할 수 없는 금액입니다.");
                                continue;
                                }
                        }else {
                            log.info("주식 구매 체결되지 않았습니다.");
                            continue;
                        }
                    }
                }
            }
        }
    }
}
