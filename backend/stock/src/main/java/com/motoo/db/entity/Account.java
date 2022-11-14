package com.motoo.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

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
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    //유저 다대일
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @Column(name="seed")
    private int seed;

    @Column(name="created_at")
    @CreationTimestamp
    private Date created_at;

    @Column(name="name")
    private String name;

    @Column(name="is_main")
    private boolean is_main;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "account", orphanRemoval = true)
    private List<AccountStock> accountStocks = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "account",orphanRemoval = true)
    private List<Trading> tradings = new ArrayList<>();

    private boolean school;

    public void createAccount(User user, String name){
        this.user = user;
        this.name = name;
    }

    public void createSchoolAccount(User user){
        this.user = user;
        this.name = "학교대항전";
        this.school = true;
    }

    public void updateAccountName(String name){
        this.name = name;
    }

    public void updateSeed(int seed){
        this.seed = seed;
    }

    public void updateIsMain(boolean main){this.is_main= main;}
}
