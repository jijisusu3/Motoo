package com.motoo.db.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;


@Entity
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String schoolname;

    private String location;

    //제이슨 유형?

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<Map<String, Object>> history;

}
