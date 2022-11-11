package com.motoo.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    private String school_ranks;

    private String personal;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "sigungu", orphanRemoval = true)
    private List<School> school = new ArrayList<>();

    public void updateSchoolRanks(String school_ranks){
        this.school_ranks = school_ranks;
    }

    public void updatePersonal(String personal) {
        this.personal = personal;
    }
}
