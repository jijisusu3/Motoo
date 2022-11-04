package com.motoo.api.controller;

import com.motoo.api.request.MakeAccountPostReq;
import com.motoo.api.request.UpdateAccountNameReq;
import com.motoo.api.request.UpdateSeedPostReq;
import com.motoo.api.response.AccountListRes;
import com.motoo.api.response.AccountsListRes;
import com.motoo.api.response.AccountStockListRes;
import com.motoo.api.service.AccountService;
import com.motoo.api.service.AccountStockService;
import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import com.motoo.db.repository.AccountStockRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNullApi;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.util.List;

@Api(value = "계좌 API", tags = {"Account"})
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/account")
public class AccountsController {


    private final AccountService accountService;

    //    private final AccountsServiceImpl accountsService;
    //계좌 생성
    @ApiOperation(value = "계좌 생성", notes = "(token) 계좌를 생성한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "계좌 생성 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "계좌 생성 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> createAccount(@RequestBody @ApiParam(value = "계좌 상세 내용", required = true) @Valid MakeAccountPostReq makeAccountPostReq) throws Exception {

//        UserDetails userDetails = (UserDetails) authentication.getDetails();
//        Long userNo = userDetails.getUserNo();
    long userId = 1;
        try
    {
        accountService.createAccount(1L, makeAccountPostReq.getName());
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
    public ResponseEntity<AccountsListRes> listAccounts(){
//        UserDetails userDetails = (UserDetails) authentication.getDetails();
//        Long userNo = userDetails.getUserNo();
        long userId = 1;
        List<Account> account = accountService.listAccount(1L);
        System.out.println('김');
        System.out.println(account);
        return ResponseEntity.status(200).body(AccountsListRes.of(account, 200, "계좌 목록조회에 성공하였습니다."));

    }

    //계좌 이름 수정
    @PutMapping()   //re
    @ApiResponses({@ApiResponse(code = 200, message = "(token) 계좌 제목 수정 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "계좌 제목 수정 실패", response = BaseResponseBody.class), @ApiResponse(code = 402, message = "해당 계좌 없음", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    @ApiOperation(value = "계좌 이름 수정", notes = "계좌 이름을 수정한다.")
    public ResponseEntity<? extends BaseResponseBody> updateAccounts(@RequestBody @ApiParam(value = "계좌 이름", required = true) @Valid UpdateAccountNameReq updateAccountNameReq){
//        UserDetails userDetails = (UserDetails) authentication.getDetails();
//        Long userNo = userDetails.getUserNo();
        Long userId = 1L;
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
    public ResponseEntity<? extends BaseResponseBody> deleteAccounts(@PathVariable @ApiParam(value = "상세번호", required = true) Long accountId){
//        UserDetails userDetails = (UserDetails) authentication.getDetails();
//        Long userNo = userDetails.getUserNo();
        System.out.println(accountId);
        Long userId = 1L;
        Account account = accountService.getAccount(accountId, 1L);
        if (account  == null) return ResponseEntity.status(402).body(BaseResponseBody.of(402, "해당 계좌가 없습니다."));
        int result = accountService.deleteAccount(accountId, userId);
        if (result == 1) return ResponseEntity.status(200).body(BaseResponseBody.of(200, "계좌가 삭제되었습니다."));
        else return ResponseEntity.status(401).body(BaseResponseBody.of(401, "계좌 삭제에 실패하였습니다."));
    }

    //계좌 시드머니 추가
    @PostMapping("/seed")
    @ApiOperation(value = "시드 추가", notes = "(token) 시드를 추가한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "시드 추가 성공", response = BaseResponseBody.class), @ApiResponse(code = 401, message = "시드 추가 실패", response = BaseResponseBody.class), @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    public ResponseEntity<? extends BaseResponseBody> updateSeed(@RequestBody @ApiParam(value = "시드 내용", required = true) @Valid UpdateSeedPostReq updateSeedPostReq){
//        UserDetails userDetails = (UserDetails) authentication.getDetails();
//        Long userNo = userDetails.getUserNo();
        Long userId = 1L;
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
    public ResponseEntity<AccountStockListRes> listStockAccounts(@PathVariable("account_id") @ApiParam(value = "상세계좌 번호", required = true) Long account_id){
//     UserDetails userDetails = (UserDetails) authentication.getDetails();
//     Long userNo = userDetails.getUserNo();
        System.out.println(account_id);
        List<AccountStock> accountStocks = accountService.listAccountStock(account_id);
        return ResponseEntity.status(200).body(AccountStockListRes.of(accountStocks, 200, "계좌 상세조회에 성공하였습니다."));


    }

    //계좌에 주식 추가

//    @GetMapping(/detail/{stock_id})
//    public ResponseEntity<Acc>
//



}

//




