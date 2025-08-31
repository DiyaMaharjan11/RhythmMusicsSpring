package com.CollegeProject.RhythmMusics.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class User
{
    @Id//Primary key
    @GeneratedValue//Auto increment of Id
    private int id;
    private String firstName;
    private String lastName;


    //default
    public User(){};

    public User(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User(int id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public int getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    //you  must geneate getter setter () and constructor(default , parameterized)
    //optional toString()
}





