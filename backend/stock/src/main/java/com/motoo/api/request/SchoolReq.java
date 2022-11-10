package com.motoo.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchoolReq {

    @NotNull
    @ApiModelProperty(name = "학교_id", example = "학교 id 입니다.")
    Long id;
}
