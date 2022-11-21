package com.motoo.api.service;

import com.motoo.db.entity.Account;
import com.motoo.db.entity.Stock;
import com.motoo.db.entity.Trading;
import com.motoo.db.entity.User;
import com.motoo.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TradingServiceImpl implements TradingService{

    private final TradingRepository tradingRepository;

    private final TradingRepositorySupport tradingRepositorySupport;


    private final UserRepository userRepository;

    private final AccountRepository accountRepository;

    private final StockRepository stockRepository;
    private final StockRepositorySupport stockRepositorySupport;
    private final AccountRepositorySupport accountRepositorySupport;

    private final AccountStockRepositorySupport accountStockRepositorySupport;
    //주문하기
    @Override
    public void writeOrder(Long userId, Long accountId, Long stockId , int tr_type, int tr_price, int tr_amount, Integer tr_avg) {
        String ticker_name;
        String ticker;
        Account account = accountRepositorySupport.findAccountByAccountIdAndUserId(accountId, userId);
        User user = userRepository.findByUserId(userId).get();
        if (stockId ==null){
            ticker_name= "시드머니추가";
            ticker = "시드머니추가";
        }else {

            Stock stock = stockRepositorySupport.findStockByAStockId(stockId);

            ticker_name = stock.getName();
            ticker = stock.getTicker();
        }
        Trading trade = new Trading();

        trade.writeOrder(account, user, ticker, ticker_name, tr_type, tr_price, tr_amount, tr_avg);
        tradingRepository.save(trade);
    }





//    public void writeOrder(Account account, String ticker, int tr_type, int tr_price, int tr_amount ){
//        this.account =account;
//        this.ticker = ticker;
//        this.tr_type = tr_type;
//        this.tr_price = tr_price;
//        this.tr_amount = tr_amount;
//
//    }
    //주문내역 조회
    @Override
    public List<Trading> tradingList(Long userId) {
        return tradingRepositorySupport.findAllTradingListByUserId(userId);

    }

    //주문 수정
    @Override
    @Transactional
    public void updateOrder(Trading trading, int tr_price, int tr_amount) {
        trading.updateTrading(tr_price, tr_amount);
    }
    //주문삭제
    @Override
    public int deleteOrder(Long userId, Long tradeId) {
        Trading trading;
        try {
            trading = tradingRepository.findByTradeId(tradeId).get();
//            accounts = accountsRepositorySupport.findAccountsByAccountsIdAndUserId(userId, accountsId).get();

        }catch (Exception e){
            return 0;
        }
        Long tradeNo = trading.getTradeId();
        tradingRepository.deleteByTradeId(tradeNo);
        return 1;
    }
    //주문 객체 조회
    @Override
    public Trading getTrading(Long userId, Long tradeId){
        return tradingRepositorySupport.findTradingByUserIdTradeId(userId, tradeId);
    }
    //주문 객체 조회
    @Override
    public Trading getTradingByUserIdAccountId(Long userId, Long accountId){
        return tradingRepositorySupport.findTradingByUserIdAccountId(userId, accountId);
    }
    //주문 타입 바꾸기
    @Override
    public void updateType(Trading trading, int tr_type){
        trading.updateType(tr_type);
    }

    @Override
    public List <Trading> tradingList1Or2(Long userId, Long accountId){
        return tradingRepositorySupport.find1Or2ByUserIdAccountId(userId, accountId);
    }

    @Override
    public List<Trading> tradingListAccount(Long userId, Long accountId){
        return tradingRepositorySupport.findAllTradingsByUserIdAccountId(userId, accountId);
    }
    @Override
    public List<Trading> tradingList3Or4(Long userId, Long accountId){
        return tradingRepositorySupport.find3Or4ByUserIdAccountId(userId, accountId);
    }
    @Override
    public List<Trading> tradingList3(Long userId, Long accountId){
        return tradingRepositorySupport.find3ByUserIdAcountId(userId, accountId);
    }
    @Override
    public List<Trading>tradingList4(Long userId, Long accountId){
        return tradingRepositorySupport.find4ByUserIdAcountId(userId, accountId);
    }

    @Override
    public List<Trading> tradingList3Or4WillBeChange(){
        return tradingRepositorySupport.findAllTrading();
    }

    @Override
    public List<Trading> tradingList6Or7WillBeDelete(){return tradingRepositorySupport.find6And7();}

    @Override
    public List<Trading> tradingList6Or7FindByUserAccountId(Long userId, Long accountId){ return  tradingRepositorySupport.find6And7ByUserIdAccountId(userId, accountId);}

    @Override
    public int tradingList3ByTicker(Long userId, Long accountId, String ticker){
        return tradingRepositorySupport.find3ByUserIdAccountIdTicker(userId, accountId, ticker);
    }
    @Override
    public void writeAvg(Trading trading, int tr_avg){};



}
