package com.CollegeProject.RhythmMusics.controller;


import com.CollegeProject.RhythmMusics.model.User;
import com.CollegeProject.RhythmMusics.repository.UserRepository;
import com.CollegeProject.RhythmMusics.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userRepository;

    @PostMapping("/saveUsers")
    //RequestBody to send Data
    public User saveUser(@RequestBody User user){
        return userRepository.saveUser(user);
    }

    @GetMapping("/get_All_Users")
    public List<User> getUser (){
        return userRepository.findUsers();
    }

}
