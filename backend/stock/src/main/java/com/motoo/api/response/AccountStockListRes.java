package com.motoo.api.response;

import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.AccountStock;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@ApiModel("AccountStockListResponse")
public class AccountStockListRes extends BaseResponseBody {

    @ApiModelProperty(name = "계좌 보유 주식 리스트")
    List<AccountStock> accountStock;




    public static AccountStockListRes of(List<AccountStock> accountStock, Integer statusCode, String message){
        AccountStockListRes res = new AccountStockListRes();
        res.setAccountStock(accountStock);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
