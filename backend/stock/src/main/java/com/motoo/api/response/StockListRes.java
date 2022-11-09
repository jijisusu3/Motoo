package com.motoo.api.response;

import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.Stock;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockListRes extends BaseResponseBody {
    List<Long> stockList;

    int seed;

    public static StockListRes of(Account account, List<Long> stockList , Integer statusCode, String message){
        StockListRes res = new StockListRes();
        res.setSeed(account.getSeed());
        res.setStockList(stockList);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
