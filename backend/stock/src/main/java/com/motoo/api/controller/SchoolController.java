package com.motoo.api.controller;

import com.motoo.api.request.SchoolReq;
import com.motoo.api.response.SchoolRegiRes;
import com.motoo.api.response.SchoolResponse;
import com.motoo.api.service.AccountService;
import com.motoo.api.service.EventService;
import com.motoo.api.service.SchoolService;
import com.motoo.api.service.UserService;
import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.User;
import com.motoo.db.repository.UserRepository;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@Api(value = "학교 API", tags = {"School"})
@RestController
@RequiredArgsConstructor
public class SchoolController {
    private final SchoolService schoolService;
    private final UserService userService;
    private final EventService eventService;

    private final AccountService accountService;


    private final UserRepository userRepository;

    @GetMapping("/api2/school")
    public ResponseEntity<?> ReadSchool(){
        return ResponseEntity.ok(schoolService.getSchoolList());
    }

    @GetMapping("/api2/eventnow")
    public ResponseEntity<?> ReadEvent() {
        return ResponseEntity.ok(eventService.getEventNow());
    }

    @PutMapping("/api2/school/update")
    public ResponseEntity<?> UpdateSchool(Authentication authentication, @RequestBody SchoolReq schoolReq) {
        Long id = userService.getUserIdByToken(authentication);
        userService.updateSchool(id, schoolReq.getId());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "학교 정보가 변경되었습니다."));
    }

    @PutMapping("/api2/school")
    public ResponseEntity<?> RegisterSchool(Authentication authentication, @RequestBody SchoolReq schoolReq) {
        Long id = userService.getUserIdByToken(authentication);
        User user = userRepository.findByUserId(id).get();
        if (user.getSchool() == null) {
            userService.updateSchool(id, schoolReq.getId());
            accountService.createSchoolAccount(id);
            return ResponseEntity.ok(accountService.getSchoolAccount(id).getAccountId());
        } else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미 계좌가 있는 유저 입니다."));
        }

    }

    @GetMapping("/api2/schoolpage")
    public ResponseEntity<?> ReadSchoolPage(Authentication authentication) {
        Long id = userService.getUserIdByToken(authentication);
        return ResponseEntity.ok(schoolService.getSchoolPage(id));
    }

    @GetMapping("/api2/test")
    public ResponseEntity<?> ReadTest() {
        schoolService.UpdateAverage();
        schoolService.UpdateSchoolRanking();
        schoolService.UpdateSigunguRanking();
        return null;
    }
}
