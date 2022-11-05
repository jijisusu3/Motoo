package com.motoo.db.entity;

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


    private String ticker_name;

    private String ticker;

    private int tr_type;

    private int tr_price;

    private int tr_amount;

    @CreationTimestamp
    private Date tr_date;


    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    public void writeOrder(Account account, String ticker, int tr_type, int tr_price, int tr_amount ){
        this.account =account;
        this.ticker = ticker;
        this.tr_type = tr_type;

    }
    public void setAccounts(Account accounts) {
        this.account = accounts;
    }
}
