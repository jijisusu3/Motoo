package com.motoo.api.response;

import com.motoo.api.dto.user.AccountStockInfo;
import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
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



    @ApiModelProperty(name = "계좌 시드머니")
    int seed;

    @ApiModelProperty(name = "해당 계좌 주식 리스트")
    List<AccountStockInfo> stockInfo;
    @ApiModelProperty(name = "판매가능한 계좌 주식 수")
    int availableSeed;


    public static StockListRes of(Account account, List<AccountStockInfo> stockInfo, int available,Integer statusCode, String message){
        StockListRes res = new StockListRes();
        res.setSeed(account.getSeed());
        res.setStockInfo(stockInfo);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }


}
