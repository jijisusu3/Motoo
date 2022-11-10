package com.motoo.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "sigungu")
public class Sigungu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long sigunguId;

    private String sigungu_name;

    private String sido;

    private String group;

    private String personal;

    @OneToMany(mappedBy = "sigungu")
    private List<School> school = new ArrayList<>();
}
