package com.motoo.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
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

    @Column(name="price")
    private Integer price;


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
