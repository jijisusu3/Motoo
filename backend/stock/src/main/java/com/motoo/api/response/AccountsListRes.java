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
    int asset;


    public static AccountsListRes of(List<Account> account,  Integer statusCode, String message){
        AccountsListRes res = new AccountsListRes();

        int seeds=0;
        for (int i = 0; i<account.size(); i++){
            seeds+=account.get(i).getSeed();
//            seeds+=account.get(i).getAccountStocks().getA
        }

        res.setAsset(seeds);
        res.setAccount(account);
        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }

}
