package com.CollegeProject.RhythmMusics.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class UserDtls {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String fullName;
    private String email;
    private String phoneNumber;

    private String password;

    //TO image
    private String profileImage;

    //TO specify the Role
    private String role;

    //Token after Login or it can be useful for password reset
    private String resetToken;
}
