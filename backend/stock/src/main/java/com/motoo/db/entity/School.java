package com.motoo.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@Table(name = "school")
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long schoolId;

    private String schoolname;

    private Integer currentRank;

    private Float average;

    private String studRanks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="sigungu_id")
    private Sigungu sigungu;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "school",orphanRemoval = true)
    private List<User> users = new ArrayList<>();

    public void updateAverageAndStud(Float average, String studRanks){
        this.average = average;
        this.studRanks = studRanks;
    }

    public void updateCurrentRank(Integer currentRank){
        this.currentRank = currentRank;
    }


}
