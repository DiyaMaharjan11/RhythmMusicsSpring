package com.CollegeProject.RhythmMusics.service;

import com.CollegeProject.RhythmMusics.model.UserDtls;
import com.CollegeProject.RhythmMusics.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



   // TO Save Users Data
    public UserDtls saveUser(UserDtls userDtls){
        userDtls.setRole("ROLE_USER");      //For Default UserDtls
        String encodedPassword = passwordEncoder.encode(userDtls.getPassword());
        userDtls.setPassword(encodedPassword);
        return userRepository.save(userDtls);
    }

   // TO find Users
    public List<UserDtls> findUsers(){
        return userRepository.findAll();
    }

    //TO get User by Emails
    public UserDtls getUserByEmail(String email) {
        return userRepository.findByEmail(email); //Created in JpaRespotory Interface
    }

    //To Set Token
    public void updateUserResetToken(String email, String resetToken) {
        UserDtls findByEmail = userRepository.findByEmail(email);
        findByEmail.setResetToken(resetToken); //To Reseting the token
        userRepository.save(findByEmail);
    }

    public UserDtls getUserByToken(String token) {
        return userRepository.findByResetToken(token);
    }

    public UserDtls updateUser(UserDtls user) {
        return userRepository.save(user);
    }
}
