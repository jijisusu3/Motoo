package com.motoo.api.response;


import com.motoo.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("SellOrBuyResponse")
public class SellOrBuyRes extends BaseResponseBody {

    @ApiModelProperty(name = "계좌 주식Id 리스트")
    List<Long> stockList;
    @ApiModelProperty(name = "계좌 시드머니")
    int seed;
    public static SellOrBuyRes of(List<Long> stockList, int seed , Integer statusCode, String message){
        SellOrBuyRes res = new SellOrBuyRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
