package com.motoo.api.response;

import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import com.motoo.db.entity.Stock;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("StockListResponse")
public class StockListRes extends BaseResponseBody {


    @ApiModelProperty(name = "계좌 주식Id 리스트")
    List<Long> stockList;
    @ApiModelProperty(name = "계좌 시드머니")
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
