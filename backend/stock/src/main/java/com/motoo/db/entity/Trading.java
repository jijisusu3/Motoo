package com.motoo.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    private Date tr_date;


}
