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
    @Column(name="id")
    private Long accountsId;

    //유저 다대일
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private int seed;

    private Date created_at;

//    private int type;

    private String name;

    @OneToMany
    private List<AccountStock> accountStocks = new ArrayList<>();


    @OneToMany
    private List<Trading> tradings = new ArrayList<>();

    public void createAccounts(User user, String name){
        this.user = user;
        this.name = name;
    }

    public void updateAccountsName(String name){
        this.name = name;
    }
}
