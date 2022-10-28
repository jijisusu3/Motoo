package com.motoo.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "account")
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    //유저 다대일
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private int seed;

    private Date created_at;

    private int type;

    private String name;

    @OneToMany
    private List<AccountsStock> accountsStocks = new ArrayList<>();


    @OneToMany
    private List<Trading> tradings = new ArrayList<>();


}
