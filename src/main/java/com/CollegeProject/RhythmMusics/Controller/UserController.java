package com.CollegeProject.RhythmMusics.Controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class UserController
{
    @GetMapping("/welcome")
    public String  findAll()
    {
        return "Welcome to the first Landing Page of spring boot";
    }

}
