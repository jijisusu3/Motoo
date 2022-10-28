package com.motoo.db.entity;


import javax.persistence.*;
import java.security.PrivateKey;
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name= "favoritestock")
public class FavoriteStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Stock stock;

//    private List<User> user = new ArrayList<>();




//    private List<Stock> stocks = new ArrayList<>();
}
