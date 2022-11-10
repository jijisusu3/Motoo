package com.motoo.api.response;

import com.motoo.db.entity.Quiz;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("QuizResponse")
public class QuizResponse {
    @ApiModelProperty(name = "퀴즈_Id")
    private Long quizId;
    @ApiModelProperty(name = "질문")
    private String question;
    @ApiModelProperty(name = "예시")
    private String examples;
    @ApiModelProperty(name = "정답")
    private Integer answer;
    @ApiModelProperty(name = "설명")
    private String explanation;

    public static QuizResponse response(Quiz quiz){
        return new QuizResponse(quiz.getQuizId(), quiz.getQuestion(), quiz.getExamples(), quiz.getAnswer(), quiz.getExplanation());
    }
}
