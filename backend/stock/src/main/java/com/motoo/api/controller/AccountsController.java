package com.motoo.api.controller;

import com.motoo.api.request.AccountStockAddPostReq;
import com.motoo.api.response.AccountsListRes;
import com.motoo.api.service.AccountService;
import com.motoo.api.service.AccountServiceImpl;
import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.AccountStock;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/account")
public class AccountsController {


    private final AccountService accountService;

    //    private final AccountsServiceImpl accountsService;
    //계좌 생성
    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> createAccount(@RequestParam("name") String name) throws Exception {

//        UserDetails userDetails = (UserDetails) authentication.getDetails();
//        Long userNo = userDetails.getUserNo();

    long userId = 1;

        try

    {
        accountService.createAccount(1L, name);
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
    public ResponseEntity<AccountsListRes> listAccounts(){
//        UserDetails userDetails = (UserDetails) authentication.getDetails();
//        Long userNo = userDetails.getUserNo();

        long userId = 1;
        List<Account> account = accountService.listAccount(1L);
        System.out.println('김');
        System.out.println(account);
//        long[] accountsCount = accountsService.getAccountsCount(accounts);

        return ResponseEntity.status(200).body(AccountsListRes.of(account, 200, "계좌 목록조회에 성공하였습니다."));


    }

    //계좌 이름 수정
    @PutMapping()
    public ResponseEntity<? extends BaseResponseBody> updateAccounts(@RequestParam Long accountId, @RequestParam String name){
//        UserDetails userDetails = (UserDetails) authentication.getDetails();
//        Long userNo = userDetails.getUserNo();
        long userId = 1;
        Account account = accountService.getAccount(userId, accountId);
        if (account == null) return ResponseEntity.status(402).body(BaseResponseBody.of(402, "해당 계좌가 없습니다."));
        try {
            accountService.updateAccount(account,name);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "계좌이름 수정에 실패했습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "계좌 이름 수정에 성공했습니다."));
    }

    //계좌 삭제
    @DeleteMapping()
    public ResponseEntity<? extends BaseResponseBody> deleteAccounts(@RequestParam Long accountId){
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

    //계좌별 주식 작성
//    @PutMapping("/{stockId}")
//    public ResponseEntity<? extends BaseResponseBody> addStock(@PathVariable  Long stockId, AccountStockAddPostReq accountStockAddPostReq) throws Exception {

//    }

}

//




