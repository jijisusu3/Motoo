package com.motoo.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "trading")
public class Trading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long tradeId;

    @Column(name="ticker_name")
    private String ticker_name;

    @Column(name="ticker")
    private String ticker;
    @Column(name="tr_type")
    private int tr_type;

    @Column(name="tr_price")
    private int tr_price;
    @Column(name="tr_amount")
    private int tr_amount;


    @Column(name="tr_date")
    @CreationTimestamp
    private Date tr_date;

    @Column(name="tr_avg")
    private Integer tr_avg;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;


    public void writeOrder(Account account, User user, String ticker, String ticker_name, int tr_type, int tr_price, int tr_amount, Integer tr_avg){
        this.user = user;
        this.account =account;
        this.ticker = ticker;
        this.ticker_name = ticker_name;
        this.tr_type = tr_type;
        this.tr_price = tr_price;
        this.tr_amount = tr_amount;
        this.tr_avg = tr_avg;


    }


    public void updateType(int tr_type) {this.tr_type = tr_type;}

    public void setAvg(int tr_avg) {this.tr_avg = tr_avg;}
    public void updateTrading(int tr_price, int tr_amount){
        this.tr_price = tr_price;
        this.tr_amount =tr_amount;
    }


}
