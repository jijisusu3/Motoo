package com.motoo.api.response;


import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Accounts;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AccountsListRes extends BaseResponseBody {

    List<Accounts> accounts;

    long[] accountsCounts;

    public static AccountsListRes of(List<Accounts> accounts, long[] accountsCounts, Integer statusCode, String message){
        AccountsListRes res = new AccountsListRes();
        res.setAccounts(accounts);
        res.setAccountsCounts(accountsCounts);
        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }

}
