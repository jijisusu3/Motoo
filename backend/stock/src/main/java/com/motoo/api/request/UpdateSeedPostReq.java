package com.motoo.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UpdateSeedPostRequest")
public class UpdateSeedPostReq {


    @ApiModelProperty(name = "계좌_id", example = "1")
    Long accountId;

    @ApiModelProperty(name = "시드머니", example = "1000")
    int seed;


}
