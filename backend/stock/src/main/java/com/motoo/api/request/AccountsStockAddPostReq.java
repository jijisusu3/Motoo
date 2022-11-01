package com.motoo.api.request;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
public class AccountsStockAddPostReq {

    //계좌 id
    @NotNull
    Long accountsId;

    //주식 id
    @NotNull
    Long stockId;

//    @NotNull
//    int amount;
//
//    @NotNull
//    int price;



}
