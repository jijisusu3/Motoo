package com.motoo.api.response;


import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AccountsListRes extends BaseResponseBody {

    List<Account> account;

//    long[] accountsCounts;

    public static AccountsListRes of(List<Account> account,  Integer statusCode, String message){
        AccountsListRes res = new AccountsListRes();
        res.setAccount(account);
//        res.setAccountsCounts(accountsCounts);
        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }

}
