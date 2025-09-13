package com.CollegeProject.RhythmMusics.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(length = 50)
    private String title;

    @Column(length = 5000)
    private String description;

    private Double price;

    private String category;

    private int stock;

    private String image;

    private Boolean isActive;

}
