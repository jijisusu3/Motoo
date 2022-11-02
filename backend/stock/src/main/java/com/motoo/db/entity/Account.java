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
public class Account {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long accountId;

    //유저 다대일
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    private int seed;


//    private Date created_at;

//    private int type;

    private String name;



    @OneToMany(fetch = FetchType.LAZY, mappedBy = "account")
    private List<AccountStock> accountStocks = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "account")
    private List<Trading> tradings = new ArrayList<>();

    public void createAccount(User user, String name){
        this.user = user;
        this.name = name;
    }

    public void updateAccountName(String name){
        this.name = name;
    }
}
