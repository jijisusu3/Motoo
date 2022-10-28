package com.motoo.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;


@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "school")
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String schoolname;
    private String location;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<Map<String, Object>> history;   //제이슨 유형?



}
