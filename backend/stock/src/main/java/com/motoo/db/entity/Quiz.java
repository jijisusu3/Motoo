package com.motoo.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "quiz")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long quizId;

    @Column(length = 200)
    private String question;

    @Column(length = 400)
    private String examples;

    private Integer answer;

    @Column(length = 400)
    private String explanation;

}
