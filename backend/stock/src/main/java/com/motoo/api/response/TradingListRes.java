package com.motoo.api.response;


import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.Trading;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class TradingListRes extends BaseResponseBody {
    List<Trading> tradings;

    public static TradingListRes of(List<Trading> tradings,  Integer statusCode, String message){
        TradingListRes res = new TradingListRes();
        res.setTradings(tradings);
        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }
}
