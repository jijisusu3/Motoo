package com.motoo.api.response;


import com.motoo.common.model.response.BaseResponseBody;
import com.motoo.db.entity.Account;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AccountsListRes extends BaseResponseBody {
    List<Account> account;
    int asset;
    ArrayList pitches;

    public static AccountsListRes of(List<Account> account, ArrayList pitches, int seeds, Integer statusCode, String message){
        AccountsListRes res = new AccountsListRes();
        res.setPitches(pitches);


        res.setAsset(seeds);
        res.setAccount(account);
        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }

}
