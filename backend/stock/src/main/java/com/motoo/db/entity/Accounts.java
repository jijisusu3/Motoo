package com.motoo.db.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private int seed;

    @Column(nullable = false)
    private Date open;

    @Column(nullable = false)
    private int type;

    @Column(nullable = false)
    private String name;



}
