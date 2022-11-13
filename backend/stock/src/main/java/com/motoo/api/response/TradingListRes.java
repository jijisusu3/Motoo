package com.motoo.api.response;


import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Trading;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@ApiModel("TradingListResponse")
public class TradingListRes extends BaseResponseBody {

    @ApiModelProperty(name = "거래내역 리스트")
    List<Trading> tradings;

    public static TradingListRes of(List<Trading> tradings,  Integer statusCode, String message){
        TradingListRes res = new TradingListRes();
        res.setTradings(tradings);
        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }
}
