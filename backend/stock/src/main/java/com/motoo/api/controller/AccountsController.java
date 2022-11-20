package com.motoo.api.controller;

import com.motoo.api.dto.user.AccountStockInfo;
import com.motoo.api.request.*;
import com.motoo.api.response.*;
import com.motoo.api.service.*;
import com.motoo.common.model.response.BaseResponseBody;

import com.motoo.db.entity.*;
import com.motoo.db.repository.StockRepositorySupport;

import com.motoo.db.repository.TradingRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;


import javax.persistence.EntityManager;
import javax.validation.Valid;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Api(value = "계좌 API", tags = {"Account"})
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api2/account")
public class AccountsController {


    private final AccountService accountService;
    private final UserService userService;
    private final AccountStockService accountStockService;

    private final StockService stockService;
    private final StockRepositorySupport stockRepositorySupport;

    private final EntityManager em;

    private final TradingService tradingService;
    private final AccountAssetService accountAssetService;

    //계좌 생성
    @ApiOperation(value = "계좌 생성", notes = "(token) 계좌를 생성한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "계좌 생성 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "계좌 생성 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> createAccount(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "계좌 상세 내용", required = true) @Valid MakeAccountPostReq makeAccountPostReq) throws Exception {
        Long userId = userService.getUserIdByToken(authentication);
        List<Account> accounts = accountService.listAccount(userId);
        boolean isSchool = false;
        for (int i=0; i<accounts.size(); i++){
            if ( accounts.get(i).isSchool()){
                isSchool=true;
            }
            else {
                continue;
            }
        }
        //계좌 갯수 유효성 검사
        if (isSchool==true){
            if (accounts.size()>=4){
                return ResponseEntity.status(401).body(BaseResponseBody.of(401, "계좌가 4개 이상입니다. 생성할 수 없습니다."));
            }
        }else {
            if (accounts.size()>=3){
                return ResponseEntity.status(401).body(BaseResponseBody.of(401, "계좌가 3개 이상입니다. 생성할 수 없습니다."));
            }
        }
        try {
            accountService.createAccount(userId, makeAccountPostReq.getName());
        } catch (
                Exception e) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "계좌 생성에 실패하였습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "계좌가 생성되었습니다."));
    }

    //계좌 목록조회
    @GetMapping()
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 계좌 목록 조회 성공", response = AccountListRes.class), @ApiResponse(code = 401, message = "계좌 목록 조회 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "계좌 목록 조회", notes = "계좌 목록을 조회한다.")
    public ResponseEntity<AccountsListRes> listAccounts(@ApiIgnore Authentication authentication) {
        Long userId = userService.getUserIdByToken(authentication);
        List<Account> account = accountService.listAccount(userId);
        int seeds=0;
        List<Integer> pitches = new ArrayList<>();
//      구매할때는 시드-구매가*주식수 + 구매가 *주식수 라서 pitches은 안변함
//      판매할때는 시드+평단가*주식수 라서 pitches는 변함
        log.info("계좌가 생성됨");
        for (Account value : account) {
            int accountAsset=0;
            seeds+=value.getSeed();
            accountAsset+=value.getSeed();
            for (int a = 0; a < value.getAccountStocks().size(); a++) {
                seeds += value.getAccountStocks().get(a).getAmount() * value.getAccountStocks().get(a).getStock().getPrice();
                accountAsset += value.getAccountStocks().get(a).getAmount() * value.getAccountStocks().get(a).getStock().getPrice();
            }
            pitches.add(accountAsset);
        }
        List<AccountStock> accountStockList = accountService.getAccountStockByUserId(userId);
        List<Integer> investList = accountStockList.stream().map(accountStock ->
                accountStock.getPrice() * accountStock.getAmount()).collect(Collectors.toList());

        List<Integer> resultList = accountStockList.stream().map(accountStock ->
                accountStock.getStock().getPrice() * accountStock.getAmount()).collect(Collectors.toList());

        int investSum = investList.stream().mapToInt(Integer::intValue).sum();
        int resultSum = resultList.stream().mapToInt(Integer::intValue).sum();


        float earningRaito = (float) (resultSum - investSum) / (float) investSum * 100;

        return ResponseEntity.status(200).body(AccountsListRes.of(account, pitches, seeds, earningRaito,200, "계좌 목록조회에 성공하였습니다."));
    }

    //계좌 이름 수정
    @PutMapping()   //re
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 계좌 제목 수정 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "계좌 제목 수정 실패", response = BaseResponseBody.class), @ApiResponse(code = 402, message = "해당 계좌 없음", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "계좌 이름 수정", notes = "계좌 이름을 수정한다.")
    public ResponseEntity<? extends BaseResponseBody> updateAccounts(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "계좌 이름", required = true) @Valid UpdateAccountNameReq updateAccountNameReq) {

        Long userId = userService.getUserIdByToken(authentication);
        Account account = accountService.getAccount(updateAccountNameReq.getAccountId(), userId);
        if (account == null) return ResponseEntity.status(402).body(BaseResponseBody.of(402, "해당 계좌가 없습니다."));
        try {
            accountService.updateAccount(account, updateAccountNameReq.getName());
        } catch (Exception e) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "계좌이름 수정에 실패했습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "계좌 이름 수정에 성공했습니다."));
    }

//순서 따라해보기
//엔티티짜져있고, 서비스 만들고, 서비스임플 짜기, 서비스에 필요한 쿼리디에스엘 작성,  컨트롤러 만듦, 테스트 만들고 그떄그떄 테스트

    //계좌 삭제
    @DeleteMapping("/{accountId}")
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 계좌 삭제 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "계좌 삭제 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "계좌 삭제", notes = "계좌를 삭제한다.")
    public ResponseEntity<? extends BaseResponseBody> deleteAccounts(@ApiIgnore Authentication authentication, @PathVariable @ApiParam(value = "상세 계좌번호", required = true) Long accountId) {
        Long userId = userService.getUserIdByToken(authentication);
        Account account = accountService.getAccount(accountId, userId);
        if (account == null) return ResponseEntity.status(402).body(BaseResponseBody.of(402, "해당 계좌가 없습니다."));
        int result = accountService.deleteAccount(accountId, userId);
        if (result == 1) return ResponseEntity.status(200).body(BaseResponseBody.of(200, "계좌가 삭제되었습니다."));
        else return ResponseEntity.status(401).body(BaseResponseBody.of(401, "계좌 삭제에 실패하였습니다."));
    }

    //계좌 시드머니 추가
    @PostMapping("/seed")
    @ApiOperation(value = "시드 추가", notes = "(token) 시드를 추가한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "시드 추가 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "시드 추가 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    public ResponseEntity<? extends BaseResponseBody> updateSeed(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "시드 내용", required = true) @Valid UpdateSeedPostReq updateSeedPostReq) {
        Long userId = userService.getUserIdByToken(authentication);
        Account account = accountService.getAccount(updateSeedPostReq.getAccountId(), userId);
        if (account == null) return ResponseEntity.status(402).body(BaseResponseBody.of(402, "해당 계좌가 없습니다."));
        try {
            accountService.updateSeed(account, updateSeedPostReq.getSeed());
        } catch (Exception e) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "시드머니 추가에 실패했습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "시드머니 추가에 성공했습니다."));
    }

    //계좌 목록상세조회
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 계좌상세 목록 조회 성공", response = AccountListRes.class), @ApiResponse(code = 401, message = "계좌상세 목록 조회 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "계좌상세 목록 조회", notes = "계좌상세 목록을 조회한다.")
    @GetMapping("/detail/{account_id}")
    public ResponseEntity<AccountStockListRes> listStockAccounts(@ApiIgnore Authentication authentication, @PathVariable("account_id") @ApiParam(value = "상세계좌 번호", required = true) Long account_id) {
        Long userId = userService.getUserIdByToken(authentication);
        List<AccountStock> accountStocks = accountService.getAccountStockByUserIdAccountId(account_id, userId);
        return ResponseEntity.status(200).body(AccountStockListRes.of(accountStocks, 200, "계좌 상세조회에 성공하였습니다."));
    }

    //계좌에 주식 구매
    @PostMapping("/buy")
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 주식 구매 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "계좌에 주식 구매 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "계좌에 구매 추가", notes = "계좌에 주식 구매한다.")
    public ResponseEntity<? extends BaseResponseBody> addStockToAccount(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "주식번호", required = true) @Valid AccountStockAddPostReq accountStockAddPostReq) {

//        //거래시간 설정
//        LocalTime now = LocalTime.now();
//        LocalDate date = LocalDate.now();
//        // 2. DayOfWeek 객체 구하기
//        DayOfWeek dayOfWeek = date.getDayOfWeek();
////        the day-of-week, from 1 (Monday) to 7 (Sunday)
//        // 3. 숫자 요일 구하기
//        int dayOfWeekNumber = dayOfWeek.getValue();
//        // 4. 숫자 요일 검증
//        if (dayOfWeekNumber >=6){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "거래 가능한 요일이 아닙니다."));
//        }
//        int hour = now.getHour();
//        if (hour >16 || hour <9){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "거래 가능한 시간이 아닙니다."));
//        }

        Long userId = userService.getUserIdByToken(authentication);
        Account account = accountService.getAccount(accountStockAddPostReq.getAccountId(), userId);
        List<Long> stockList = accountStockService.getAccountStockIdList(account);
        int seed = account.getSeed();
        int postPrice = accountStockAddPostReq.getPrice();
        int postAmount = accountStockAddPostReq.getAmount();
        Long accountId = account.getAccountId();

        //지금 주식 가격이랑 내 주문량, 가격이랑 비교용도의 주식객체
        Stock stock = stockRepositorySupport.findStockByAStockId(accountStockAddPostReq.getStockId());

        //시드머니 조회하여 구매가격이 시드머니보다 높으면 구매불가
        if (seed >= postPrice * postAmount) {

            //구매할 금액*양이 현재 주식가격*양 보다 낮을경우 구매불가
            if (postPrice *postAmount >= postAmount * stock.getPrice()) {

                //계좌 주식 리스트에 해당 주식이 있으면 주식 평단가 수정
                if (stockList.contains(accountStockAddPostReq.getStockId())) {
                    Long accountStockId = accountStockService.getAccountStockIdByStockId(account.getAccountId(), accountStockAddPostReq.getStockId());
                    AccountStock accountStock = accountStockService.getAccountStockByUserIdAccountStockId(userId, accountStockId);
                    int currentAmount = accountStock.getAmount();
                    int currentPrice = accountStock.getPrice();

                    //이동평균법에 의한 새로운 가격
                    int newPrice = (currentPrice * currentAmount + postPrice * postAmount) / (currentAmount + postAmount);
                    int newAmount = currentAmount + postAmount;

                    //시드머니 변경
                    accountService.updateSeed(account, -(postPrice * postAmount));
                    //해당 보유주식 가격, 수량 변경
                    accountStockService.updateAmountPrice(accountStock, newAmount, newPrice);
                    tradingService.writeOrder(userId,accountId,accountStockAddPostReq.getStockId(),2 ,postPrice,postAmount, null);
                    //변경된 stockList

                    return ResponseEntity.status(200).body(SellOrBuyRes.of(stockList, seed, 200, "계좌에 이동평균가격 적용"));
                }
                //계좌 주식 리스트에 해당 주식이 없으면 주식 등록

                //시드머니 변경
                accountService.updateSeed(account, -(postPrice * postAmount));
                accountStockService.addStockToAccount(userId, accountStockAddPostReq.getAccountId(), accountStockAddPostReq.getStockId(), accountStockAddPostReq.getPrice(), accountStockAddPostReq.getAmount());
                tradingService.writeOrder(userId,accountId,accountStockAddPostReq.getStockId(),2 ,postPrice,postAmount, null);


                return ResponseEntity.status(200).body(SellOrBuyRes.of(stockList, seed, 200, "계좌에 구매 했습니다."));
            } else {
                tradingService.writeOrder(userId,accountId,accountStockAddPostReq.getStockId(),2 ,postPrice,postAmount, null);
                return ResponseEntity.status(200).body(SellOrBuyRes.of(stockList, seed, 200, "구매할 수 없는 금액입니다. 구매 요청을 보냅니다."));
            }
        } else {
            em.clear();
            return ResponseEntity.status(401).body(SellOrBuyRes.of(stockList, seed, 401, "시드머니가 부족합니다."));
        }
    }
    //판매 유효성 검사해야됌
    //계좌에 주식 판매
    @PostMapping("/sell")
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 주식 판매 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "계좌에 주식 판매 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "계좌에 주식 판매", notes = "계좌에 주식을 판매한다.")
    public ResponseEntity<? extends BaseResponseBody> sellStockToAccount(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "주식번호", required = true) @Valid AccountStockAddPostReq accountStockAddPostReq) {
        Long userId = userService.getUserIdByToken(authentication);
        Account account = accountService.getAccount(accountStockAddPostReq.getAccountId(), userId);
        List<Long> stockList = accountStockService.getAccountStockIdList(account);
        Long accountStockId = accountStockService.getAccountStockIdByStockId(account.getAccountId(), accountStockAddPostReq.getStockId());
        AccountStock accountStock = accountStockService.getAccountStockByUserIdAccountStockId(userId, accountStockId);
        Stock stock = stockRepositorySupport.findStockByAStockId(accountStockAddPostReq.getStockId());
        Long stockId =  stock.getStockId();
        Long accountId = account.getAccountId();

//        //거래시간 설정
//        LocalTime now = LocalTime.now();
//        LocalDate date = LocalDate.now();
//        // 2. DayOfWeek 객체 구하기
//        DayOfWeek dayOfWeek = date.getDayOfWeek();
//        // 3. 숫자 요일 구하기
//        int dayOfWeekNumber = dayOfWeek.getValue();
//        // 4. 숫자 요일 검증
//        if (dayOfWeekNumber >=6){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "거래 가능한 시간이 아닙니다."));
//        }
//        int hour = now.getHour();
//        if (hour >16 || hour <9){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "거래 가능한 시간이 아닙니다."));

        //주문 객체

        int postPrice = accountStockAddPostReq.getPrice();
        int postAmount = accountStockAddPostReq.getAmount();
        int seed = account.getSeed();

        //주식 소유여부 분기
        if (stockList.contains(accountStockAddPostReq.getStockId())) {
            //판매할 금액이 현재 주식가격보다 높을경우 판매불가
            if (accountStockAddPostReq.getAmount() * accountStockAddPostReq.getPrice() > accountStockAddPostReq.getAmount() * stock.getPrice()) {
                tradingService.writeOrder(userId,accountId,accountStockAddPostReq.getStockId(),3 ,postPrice,postAmount, null);
                return ResponseEntity.status(401).body(SellOrBuyRes.of(stockList, seed, 401, "판매가격이 시장가보다 높습니다. 판매예약을 보냅니다."));
            } else {
                //해당 보유한 주식의 양분기 같으면 안됌!!!!!
                if (accountStock.getAmount() < accountStockAddPostReq.getAmount()) {


                    return ResponseEntity.status(401).body(SellOrBuyRes.of(stockList, seed, 401, "계좌에 해당 주식의 양이 없습니다."));
                } else {
                    int currentAmount = accountStock.getAmount();
                    int currentPrice = accountStock.getPrice();

                    int newAmount = currentAmount - accountStockAddPostReq.getAmount();




                    //시드머니 변경
                    accountService.updateSeed(account, +(postAmount * postPrice));

                    //해당 보유주식 가격, 수량 변경
                    accountStockService.updateAmountPrice(accountStock, newAmount, currentPrice);

                    //보유주식이 0으로 떨어지면 보유계좌에서 삭제
                    if (accountStock.getAmount() <= 0) {
                        accountStockService.deleteStockInAccount(userId, accountId, accountStockAddPostReq.getStockId());
                    }

                    //판매 거래내역에 추가
                    int original = accountStock.getPrice();
                    Integer converted = Integer.valueOf(original);

                    tradingService.writeOrder(userId,accountId,stockId,1 ,accountStockAddPostReq.getPrice(),accountStockAddPostReq.getAmount(), converted);
                    //판매 평단가 저장

                    return ResponseEntity.status(200).body(SellOrBuyRes.of(stockList, seed, 200, "해당 주식 판매완료"));
                }
            }

        } else {
            //계좌 주식 리스트에 해당 주식이 없으면 판매 불가능
            //변경된 stockList
            return ResponseEntity.status(401).body(SellOrBuyRes.of(stockList, seed, 401, "계좌에 해당 주식이 없습니다."));
        }
    }
    //보유한 주식 계좌 리스트 조회
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 계좌상세 목록 조회 성공", response = AccountListRes.class), @ApiResponse(code = 401, message = "계좌상세 목록 조회 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "보유한 주식 Id, 보유량 조회", notes = "보유한 주식 Id, 보유량 조회")
    @GetMapping("/check/{account_id}")
    public ResponseEntity<? extends BaseResponseBody> checkStockList(@ApiIgnore Authentication authentication, @PathVariable("account_id") @ApiParam(value = "상세계좌 번호", required = true) Long account_id) {
        Long userId = userService.getUserIdByToken(authentication);
        Account account = accountService.getAccount(account_id, userId);

        //주 계좌 시드머니 세팅

        //판매가능한 수
        int available=0;

        List<AccountStockInfo> stockInfo = userService.getStockInfoByAccountId(userId,account_id);
        StockListRes stockListRes = StockListRes.of(account, stockInfo, available, 200, "보유주식 리스트 조회에 성공하였습니다.");
        int seed = account.getSeed();
        List<Trading> tradings4 = tradingService.tradingList4(userId, account_id);
        List<Integer> waitingPriceList = tradings4.stream().map(trading -> trading.getTr_amount() * trading.getTr_price()).collect(Collectors.toList());
        int waitingPrice = waitingPriceList.stream().mapToInt(Integer::intValue).sum();

        stockListRes.setAvailableSeed(seed-waitingPrice);

        return ResponseEntity.status(200).body(stockListRes);
    }
}





