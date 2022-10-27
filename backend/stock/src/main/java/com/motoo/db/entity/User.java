package com.motoo.db.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

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
    @OneToOne
    private School school;


    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String phone_number;
    @Column(nullable = false)
    private Date birthday;

    @Column(nullable = false)
    private String school_id;

//    private int current;

    public void updatePw(String password) {
        this.password = password;
    }


//    public void updateCurrent(String current){
//        this.curent  = current
//    }


    public void updateUser(String username, String nickname, String email, String phone_number,
                           Date birthday, String school_id
                           ){
        this.username = username;
        this.nickname = nickname;
        this.email = email;
        this.phone_number = phone_number;
        this.birthday = birthday;
        this.school_id = school_id;

    }



}
