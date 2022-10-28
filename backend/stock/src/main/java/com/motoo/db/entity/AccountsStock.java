package com.motoo.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="accountstock")
public class AccountsStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int amount;

    private int price;

    @ManyToOne(fetch = FetchType.LAZY)
    private Accounts accounts;

    @ManyToOne(fetch = FetchType.LAZY)
    private Stock stock;


}
