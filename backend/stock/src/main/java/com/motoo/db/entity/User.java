package com.motoo.db.entity;


import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="user")
public class User {


    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long userId;

    //스쿨이랑 일대일
//    @OneToOne
//    private School school;

    //계좌랑 일대다

    @Builder.Default
    @JsonIgnore
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Account> account = new ArrayList<>();

    private Long school_id;
//    @OneToMany(mappedBy = "user")
//    private List<School> schools = new ArrayList<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<FavoriteStock> favoriteStocks = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Trading> tradings = new ArrayList<>();

    private String email;

    private String nickname;

    private String role;

    private int current;

    public void createUser(String email, String nickname){
        this.email = email;
        this.nickname = nickname;
        this.current = 1;
    }



    public void updateCurrent(int current){
        this.current = current;
    }


    public void updateNickname(String nickname){
        this.nickname = nickname;
    }



}
