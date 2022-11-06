package com.motoo.db.entity;

import lombok.*;


import javax.persistence.*;
import java.util.Date;




@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "events")
public class Events {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long eventsId;

    private Date open_date;

    private Date close_date;

//    @Convert(converter = StringArrayConverter.class)
    @Column(length = 100)
    private String hall_of_fame;


}
