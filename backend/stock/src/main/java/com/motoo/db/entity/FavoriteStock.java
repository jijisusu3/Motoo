package com.motoo.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.security.PrivateKey;
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@Table(name= "favoritestock")
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteStock {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoriteStockId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="stock_id")
    private Stock stock;

//    private List<User> user = new ArrayList<>();




//    private List<Stock> stocks = new ArrayList<>();
}
