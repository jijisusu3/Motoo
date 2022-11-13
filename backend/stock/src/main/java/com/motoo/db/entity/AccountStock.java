package com.motoo.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="accountstock")
public class AccountStock {


    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountStockId;

    @Column(name="amount")
    private int amount;

    @Column(name="price")
    private int price;



    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="account_id")
    private Account account;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="stock_id")
    private Stock stock;

    public void createAccountStock(Account account, Stock stock, int amount, int price){
        this.account = account;
        this.stock = stock;
        this.price =price;
        this.amount = amount;
    }

    public void updateAccountStockAmountPrice(int amount, int price){
        this.amount = amount;
        this.price = price;
    }
}
