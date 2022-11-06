package com.motoo.api.controller;

import com.motoo.api.request.QuizReq;
import com.motoo.api.service.QuizService;
import com.motoo.api.service.UserService;
import com.motoo.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@RestController
@RequiredArgsConstructor
public class QuizController {

    private final UserService userService;

    private final QuizService quizService;

    @GetMapping("/api2/quiz")
    public ResponseEntity<?> ReadQuiz() { return ResponseEntity.ok(quizService.getQuiz()); }

    @PutMapping("/api2/quiz")
    public ResponseEntity SolveQuiz(Authentication authentication, @RequestBody QuizReq quizReq) {
        Long id = userService.getUserIdByToken(authentication);
        Date now = java.sql.Date.valueOf(LocalDate.now());
        userService.updateQuizDay(id, now);
        String result = quizService.solveQuiz(id, quizReq);


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, result));
    }

}
