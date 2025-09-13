package com.CollegeProject.RhythmMusics.repository;

import com.CollegeProject.RhythmMusics.model.UserDtls;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserDtls,Integer> {

    //To find the User By Email.
    UserDtls findByEmail(String username);


    //TO find the user by the Token(saved as resetToken in Db)
    UserDtls findByResetToken(String token);
}
