package com.motoo.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.security.PrivateKey;
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name= "favoritestock")
public class FavoriteStock {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoriteStockId;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="stock_id")
    private Stock stock;

//    private List<User> user = new ArrayList<>();




//    private List<Stock> stocks = new ArrayList<>();
}
