package com.CollegeProject.RhythmMusics.Controller;

import com.CollegeProject.RhythmMusics.Service.UserService;
import com.CollegeProject.RhythmMusics.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController
{

    @Autowired
    UserService  userService;

    @GetMapping("/welcome")
    public String  findAll()
    {
        return "Welcome to the first Landing Page of spring boot";
    }


    @GetMapping("/users")
    public List<User> getAllUser(){
        return userService.getUsers();
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user){
        return userService.addUsers(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id){
        userService.deleteUser(id);
    }


}
