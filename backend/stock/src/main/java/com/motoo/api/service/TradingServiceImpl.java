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
import java.util.Optional;

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
    //주문하기
    @Override
    public void writeOrder(Long userId, Long accountId, Long stockId ,int tr_type, int tr_price, int tr_amount) {
        Account account = accountRepositorySupport.findAccountByAccountIdAndUserId(accountId, userId);
        Stock stock =stockRepositorySupport.findStockByAStockId(stockId);
        Trading trade = new Trading();
        User user = userRepository.findByUserId(userId).get();
        String ticker = stock.getTicker();
        String ticker_name = stock.getName();
        System.out.println( ticker);
        trade.writeOrder(account, user, ticker, ticker_name,tr_type, tr_price, tr_amount);
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
        return tradingRepositorySupport.findTradingByUserIdAccountId(userId, tradeId);
    }
}
