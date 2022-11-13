package com.motoo.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("QuizRequest")
public class QuizReq {

    @NotNull
    @ApiModelProperty(name = "퀴즈_id", example = "계좌 id 입니다.")
    Long id;
    @NotNull
    @ApiModelProperty(name = "정답", example = "경제")
    Integer answer;
}
