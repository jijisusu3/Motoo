package com.motoo.api.controller;

import com.motoo.api.request.QuizReq;
import com.motoo.api.service.QuizService;
import com.motoo.api.service.UserService;
import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.User;
import com.motoo.db.repository.UserRepository;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.datasource.IsolationLevelDataSourceAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
@Api(value = "퀴즈 API", tags = {"Quiz"})
@RestController
@RequiredArgsConstructor
public class QuizController {
    private final UserRepository userRepository;

    private final UserService userService;
    private final QuizService quizService;
    @GetMapping("/api2/quiz")
    public ResponseEntity<?> ReadQuiz() { return ResponseEntity.ok(quizService.getQuiz()); }
    @PutMapping("/api2/quiz")
    public ResponseEntity SolveQuiz(Authentication authentication, @RequestBody QuizReq quizReq) {

        Long id = userService.getUserIdByToken(authentication);
        User user = userRepository.findByUserId(id).get();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date now = java.sql.Date.valueOf(LocalDate.now());
        String nowdate = format.format(now);
        if (user.getQuizDay() != null) {
            Date quiz = user.getQuizDay();
            String quizdate = format.format(quiz);
            if (quizdate.equals(nowdate)) {
                return ResponseEntity.status(400).body(BaseResponseBody.of(400, "욕심쟁이"));
            } else {
                userService.updateQuizDay(id, now);
                String result = quizService.solveQuiz(id, quizReq);
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, result));
            }
        } else {
            userService.updateQuizDay(id, now);
            String result = quizService.solveQuiz(id, quizReq);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, result));
        }




    }

}
