package com.motoo.api.controller;

import com.motoo.api.request.*;
import com.motoo.api.response.AccountListRes;
import com.motoo.api.response.AccountsListRes;
import com.motoo.api.response.AccountStockListRes;
import com.motoo.api.service.AccountService;
import com.motoo.api.service.AccountStockService;
import com.motoo.api.service.UserService;
import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import com.motoo.db.entity.User;
import com.motoo.db.repository.AccountStockRepository;
import com.motoo.db.repository.UserRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNullApi;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.util.List;

@Api(value = "계좌 API", tags = {"Account"})
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api2/account")
public class AccountsController {


    private final AccountService accountService;
    private final UserService userService;
    private final AccountStockService accountStockService;




    //계좌 생성
    @ApiOperation(value = "계좌 생성", notes = "(token) 계좌를 생성한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "계좌 생성 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "계좌 생성 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> createAccount(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "계좌 상세 내용", required = true) @Valid MakeAccountPostReq makeAccountPostReq) throws Exception {

        Long userId =  userService.getUserIdByToken(authentication);
//        UserDetails userDetails = (UserDetails) authentication.getDetails();
//        Long userNo = userDetails.getUserNo();

        try
    {
        accountService.createAccount(userId, makeAccountPostReq.getName());
    } catch(
    Exception e)
    {
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "계좌 생성에 실패하였습니다."));
    }
        return ResponseEntity.status(200).

    body(BaseResponseBody.of(200, "계좌가 생성되었습니다."));
    }

   //계좌 목록조회
    @GetMapping()
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 계좌 목록 조회 성공", response = AccountListRes.class), @ApiResponse(code = 401, message = "계좌 목록 조회 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "계좌 목록 조회", notes = "계좌 목록을 조회한다.")
    public ResponseEntity<AccountsListRes> listAccounts(@ApiIgnore Authentication authentication){
        Long userId =  userService.getUserIdByToken(authentication);
        List<Account> account = accountService.listAccount(userId);
        System.out.println('김');
        System.out.println(account);
        return ResponseEntity.status(200).body(AccountsListRes.of(account, 200, "계좌 목록조회에 성공하였습니다."));

    }

    //계좌 이름 수정
    @PutMapping()   //re
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 계좌 제목 수정 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "계좌 제목 수정 실패", response = BaseResponseBody.class), @ApiResponse(code = 402, message = "해당 계좌 없음", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "계좌 이름 수정", notes = "계좌 이름을 수정한다.")
    public ResponseEntity<? extends BaseResponseBody> updateAccounts(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "계좌 이름", required = true) @Valid UpdateAccountNameReq updateAccountNameReq ){

        Long userId =  userService.getUserIdByToken(authentication);
        Account account = accountService.getAccount(updateAccountNameReq.getAccountId(),userId);
        if (account == null) return ResponseEntity.status(402).body(BaseResponseBody.of(402, "해당 계좌가 없습니다."));
        try {
            accountService.updateAccount(account,updateAccountNameReq.getName());
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
    public ResponseEntity<? extends BaseResponseBody> deleteAccounts(@ApiIgnore Authentication authentication, @PathVariable @ApiParam(value = "상세번호", required = true) Long accountId){
        Long userId =  userService.getUserIdByToken(authentication);
        Account account = accountService.getAccount(accountId, userId);
        if (account  == null) return ResponseEntity.status(402).body(BaseResponseBody.of(402, "해당 계좌가 없습니다."));
        int result = accountService.deleteAccount(accountId, userId);
        if (result == 1) return ResponseEntity.status(200).body(BaseResponseBody.of(200, "계좌가 삭제되었습니다."));
        else return ResponseEntity.status(401).body(BaseResponseBody.of(401, "계좌 삭제에 실패하였습니다."));
    }

    //계좌 시드머니 추가
    @PostMapping("/seed")
    @ApiOperation(value = "시드 추가", notes = "(token) 시드를 추가한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "시드 추가 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "시드 추가 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    public ResponseEntity<? extends BaseResponseBody> updateSeed(@ApiIgnore Authentication authentication,  @RequestBody @ApiParam(value = "시드 내용", required = true) @Valid UpdateSeedPostReq updateSeedPostReq){
        Long userId =  userService.getUserIdByToken(authentication);
        Account account = accountService.getAccount(updateSeedPostReq.getAccountId(),userId);
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
    public ResponseEntity<AccountStockListRes> listStockAccounts(@ApiIgnore Authentication authentication,@PathVariable("account_id") @ApiParam(value = "상세계좌 번호", required = true) Long account_id){
        Long userId =  userService.getUserIdByToken(authentication);
        List<AccountStock> accountStocks = accountService.getAccountStockByUserIdAccountId(account_id,userId);
        return ResponseEntity.status(200).body(AccountStockListRes.of(accountStocks, 200, "계좌 상세조회에 성공하였습니다."));


    }

    //계좌에 주식 추가
    /**관심종목 등록/삭제
     *
     */
    @PostMapping("/add")
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 주식 추가 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "계좌에 주식 추가 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "계좌에 주식 추가", notes = "계좌에 주식 추가한다.")
    public ResponseEntity<? extends BaseResponseBody> addStockToAccount(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "주식번호", required = true) @Valid AccountStockAddPostReq accountStockAddPostReq) {
        Long userId = userService.getUserIdByToken(authentication);
        User user = userService.getByUserId(userId).orElseGet(() -> new User());
        Account account  = accountService.getAccount(accountStockAddPostReq.getAccountId(), userId);

        List<Long> stockList = accountStockService.getAccountStockIdList(account);
        //계좌 주식 리스트에 해당 주식이 있으면 주식 평단가 수정



        if (stockList.contains(accountStockAddPostReq.getStockId())) {
//            accountStockService.deleteStockInAccount(userId, accountStockAddPostReq.getAccountId(), accountStockAddPostReq.getStockId());
            List<AccountStock> accountStocks = accountService.getAccountStockByUserIdAccountId(accountStockAddPostReq.getAccountId(),userId);
            Long accountStockId = accountStockService.getAccountStockIdByStockId(accountStockAddPostReq.getStockId());

//            accountStocks.
//            Long accountStockId = accountStocks.get(1).getAccountStockId();
//            Long accountStockId = null;
//            System.out.println(accountStocks);
//            for (int root =0; root < accountStocks.size(); root++){
//                if (accountStocks.get(root).getAccountStockId() == accountStockAddPostReq.getStockId()){
//                    accountStockId = accountStocks.get(root).getAccountStockId();
//                    break;
//                }
//                System.out.println(accountStocks.get(root).getAccountStockId());
//            }

            AccountStock accountStock = accountStockService.getAccountStockByUserIdAccountStockId(userId, accountStockId);
            int currentAmount = accountStock.getAmount();
            int currentPrice = accountStock.getPrice();
            System.out.println(currentAmount);
            System.out.println(currentPrice);
            //이동평균법에 의한 새로운 가격
            int newPrice = (currentPrice*currentAmount + accountStockAddPostReq.getPrice()*accountStockAddPostReq.getAmount())/(currentAmount+accountStockAddPostReq.getAmount());
            int newAmount = currentAmount + accountStockAddPostReq.getAmount();
            System.out.println(newAmount);
            System.out.println(newPrice);

            accountStockService.updateAmountPrice(accountStock, newAmount, newPrice);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "계좌에 이동평균가격 적용"));
        }
        //계좌 주식 리스트에 해당 주식이 없으면 주식 등록
        System.out.println(accountStockAddPostReq.getAmount());
        accountStockService.addStockToAccount(userId, accountStockAddPostReq.getAccountId(), accountStockAddPostReq.getStockId(), accountStockAddPostReq.getPrice(), accountStockAddPostReq.getAmount());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "계좌에 등록함"));
    }


}

//




