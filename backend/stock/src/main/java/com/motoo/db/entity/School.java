package com.motoo.db.entity;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="sigungu_id")
    private Sigungu sigungu;
}
