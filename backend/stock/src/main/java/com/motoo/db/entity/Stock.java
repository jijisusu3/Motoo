package com.motoo.db.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigInteger;

@Entity
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticker;

    private String name;

    private int price;

    private int close_price;

    private double fluctuation_rate;

    private int fluctuation_price;

    private int volume;

    private BigInteger trading_value;

    private int maximum;

    private int minimum;

    private double per;

    private BigInteger m_capital;

    private BigInteger issued;

    private int capital;

    private int category_id;

    private double roe;

    private double eps;

}
