package com.motoo.api.response;

import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.AccountStock;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class AccountStockListRes extends BaseResponseBody {

    List<AccountStock> accountStock;
    int asset;

    public static AccountStockListRes of(List<AccountStock> accountStock, Integer statusCode, String message){
        AccountStockListRes res = new AccountStockListRes();
        res.setAccountStock(accountStock);
//        res.setAccountsCounts(accountsCounts);
        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }
}
