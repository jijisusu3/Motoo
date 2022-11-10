package com.motoo.api.response;

import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AccountListResponse")
public class AccountListRes extends BaseResponseBody{

    @ApiModelProperty(name = "계좌_id")
    long accountId;
    @ApiModelProperty(name = "계좌 이름")
    String name;
    @ApiModelProperty(name = "계좌 시드머니")
    int seed;



    public static AccountListRes of (Account account, Integer statusCode, String message){
        AccountListRes res = new AccountListRes();

        res.setAccountId(account.getAccountId());
        res.setName(account.getName());
        res.setSeed(account.getSeed());
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }





}
