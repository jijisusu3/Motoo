package com.motoo.api.response;

import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AccountListRes extends BaseResponseBody{
    long accountId;

    String name;

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
