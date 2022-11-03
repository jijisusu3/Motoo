package com.motoo.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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

    private String ticker;

    private String name;




    private BigInteger m_capital;
    private BigInteger issued;
    private BigInteger trading_value;

    private Integer price;
    private Integer close_price;
    private Integer fluctuation_price;
    private Integer volume;
    private Integer maximum;
    private Integer minimum;
    private Short per;
    private Short fluctuation_rate;
    private Integer capital;
    private Integer open_price;
    private Integer category_id;
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
    private List<FavoriteStock> favoriteStocks = new ArrayList<>();


    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy="stock")
    private List<AccountStock> accountStocks = new ArrayList<>();
}
