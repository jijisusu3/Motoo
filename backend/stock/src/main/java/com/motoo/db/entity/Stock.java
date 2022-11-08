package com.motoo.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name= "stock")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long stockId;

    @Column(name="ticker")
    private String ticker;

    @Column(name="name")
    private String name;


    @JsonIgnore
    @Column(name="m_capital")
    private BigInteger m_capital;
    @JsonIgnore
    @Column(name="issued")
    private BigInteger issued;
    @JsonIgnore
    @Column(name="trading_value")
    private BigInteger trading_value;

    @Column(name="price")
    private Integer price;
    @JsonIgnore
    @Column(name="close_price")
    private Integer close_price;
    @JsonIgnore
    @Column(name="fluctuation_price")
    private Integer fluctuation_price;
    @JsonIgnore
    @Column(name="volume")
    private Integer volume;
    @JsonIgnore
    @Column(name="maximum")
    private Integer maximum;
    @JsonIgnore
    @Column(name="minimum")
    private Integer minimum;
    @JsonIgnore
    @Column(name="per")
    private Short per;
    @JsonIgnore
    @Column(name="fluctuation_rate")
    private Short fluctuation_rate;
    @JsonIgnore
    @Column(name="capital")
    private Integer capital;
    @JsonIgnore
    @Column(name="open_price")
    private Integer open_price;
    @JsonIgnore
    @Column(name="category_id")
    private Integer category_id;
    @JsonIgnore
    @Column(name="eps")
    private Short eps; //DOUBL

    /**
    private int price;
    private int close_price;
    private int fluctuation_price;
    private int volume;
    private int maximum;
    private int minimum;
    private double per;
    private double fluctuation_rate;
    private int capital;
    private int open_price;
    private int category_id;
    private double eps; //DOUBL
     **/

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy="stock")
//    private List<FavoriteStock> favoriteStocks;
    private List<FavoriteStock> favoriteStocks = new ArrayList<>();


    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy="stock")
    private List<AccountStock> accountStocks = new ArrayList<>();
}
