package com.motoo.api.controller;

import com.motoo.api.service.AccountsService;
import com.motoo.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/accounts")
public class AccountsController {


    private final AccountsService accountsService;


    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> createAccounts(String name)
        throws Exception{

        long userId = 30;

        try {
            accountsService.createAccounts(userId, name);
        }catch (Exception e){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "계좌 생성에 실패하였습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "계좌가 생성되었습니다."));

    }

//    @GetMapping()
//    public ResponseEntity<ResumeListRes> listResume(@ApiIgnore Authentication authentication) {
//        UserDetails userDetails = (UserDetails) authentication.getDetails();
//        Long userNo = userDetails.getUserNo();
//        List<Resume> resumes = resumeService.listResume(userNo);
//        long[] detailCounts = resumeService.getDetailCount(resumes);
//        return ResponseEntity.status(200).body(ResumeListRes.of(resumes, detailCounts, 200, "자기소개서 목록조회에 성공하였습니다."));
//    }



}
