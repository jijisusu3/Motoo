package com.motoo.api.response;

import com.motoo.db.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResponse {
    private Long quizId;

    private String question;

    private String examples;

    private Integer answer;

    private String explanation;

    public static QuizResponse response(Quiz quiz){
        return new QuizResponse(quiz.getQuizId(), quiz.getQuestion(), quiz.getExamples(), quiz.getAnswer(), quiz.getExplanation());
    }
}
