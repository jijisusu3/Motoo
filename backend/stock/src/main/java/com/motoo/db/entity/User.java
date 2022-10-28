package com.motoo.db.entity;


import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private Long id;

    //스쿨이랑 일대일
//    @OneToOne
//    private School school;

    //계좌랑 일대다

    @Builder.Default
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Accounts> accounts= new ArrayList<>();

    private int school_id;
//    @OneToMany(mappedBy = "user")
//    private List<School> schools = new ArrayList<>();


    @OneToMany(mappedBy = "user")
    private List<FavoriteStock> favoriteStocks = new ArrayList<>();

    @OneToMany
    private List<Trading> tradings = new ArrayList<>();

    private String email;

    private String username;

    private String nickname;

    private String password;

    private int current;

    public void updatePw(String password) {
        this.password = password;
    }


    public void updateCurrent(int current){
        this.current = current;
    }


    public void updateUser(String username, String nickname, String email, String phone_number,
                           Date birthday
                           ){
        this.username = username;
        this.nickname = nickname;
        this.email = email;


    }



}
