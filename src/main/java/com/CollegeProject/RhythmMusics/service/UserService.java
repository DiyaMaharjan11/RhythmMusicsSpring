package com.CollegeProject.RhythmMusics.service;

import com.CollegeProject.RhythmMusics.model.User;
import com.CollegeProject.RhythmMusics.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Service
public class UserService
{
    @Autowired
    private UserRepository userRepository;

   // TO Save Users Data
    public User saveUser(User user){
        return userRepository.save(user);
    }

   // TO find Users
    public List<User> findUsers(){
        return userRepository.findAll();
    }
}
