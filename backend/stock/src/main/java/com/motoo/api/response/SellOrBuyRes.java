package com.motoo.api.response;


import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SellOrBuyRes extends BaseResponseBody {

    List<Long> stockList;
    int seed;
    public static SellOrBuyRes of(List<Long> stockList, int seed , Integer statusCode, String message){
        SellOrBuyRes res = new SellOrBuyRes();
        res.setStockList(stockList);
        res.setSeed(seed);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
