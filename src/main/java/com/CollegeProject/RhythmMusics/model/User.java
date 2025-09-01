package com.CollegeProject.RhythmMusics.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="project_user")
public class User
{
    @Id//Primary key
    @GeneratedValue//Auto increment of Id
    private int id;
    private String firstName;
    private String lastName;


}





