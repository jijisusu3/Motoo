package com.motoo.api.dto.user;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccountStockInfo {
    private Long stockId;
    private String ticker;
    private int amount;
    private int available;
}
