package com.motoo.api.service;

import com.motoo.api.request.QuizReq;
import com.motoo.api.response.QuizResponse;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.Quiz;
import com.motoo.db.entity.Trading;
import com.motoo.db.entity.User;
import com.motoo.db.repository.AccountRepository;
import com.motoo.db.repository.QuizRepository;
import com.motoo.db.repository.TradingRepository;
import com.motoo.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuizService {

    private final QuizRepository quizRepository;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final AccountService accountService;

    private final TradingRepository tradingRepository;

    @Transactional
    public QuizResponse getQuiz(){
        Long num = quizRepository.countBy();
        Quiz quiz = quizRepository.findById(Long.valueOf((int)(Math.random()*num)+1)).get();
        return QuizResponse.response(quiz);
    }

    public String solveQuiz(Long id, QuizReq req){
        Quiz quiz = quizRepository.findById(req.getId()).get();
        User user = userRepository.findByUserId(id).get();
        Long acc = Long.valueOf(userRepository.findByUserId(id).get().getCurrent());
        Account account = accountRepository.findByAccountId(acc).get();
        if (req.getAnswer() == quiz.getAnswer()) {
            accountService.updateSeed(account, 200000);
            Trading trade = new Trading();
            trade.writeOrder(account, user, null, "퀴즈",5, 200000, 1,null);
            tradingRepository.save(trade);
            String result = "정답";
            return result;
        } else {
            String result = "오답";
            return result;
        }
    }
}
