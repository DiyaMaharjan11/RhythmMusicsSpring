package com.CollegeProject.RhythmMusics.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String home() {
        return "index"; // Spring will look for index.css.html in templates
    }

    @GetMapping("/about")
    public String aboutPage() {
        return "about"; // this will render about.html from templates
    }

    @GetMapping("/login")
    public String studentLogin() {
        return "login"; // looks for login.html in templates
    }

    @GetMapping("/teacher-login")
    public String teacherLogin() {
        return "teacher-login"; // looks for teacher-login.html in templates
    }

    @GetMapping("/admin-login")
    public String adminLogin() {
        return "admin-login"; // looks for admin-login.html in templates
    }

    @GetMapping("/signup")
     public String signupPage() {
        return "signup";
    }

    @GetMapping("/products")
    public String productPage() {
        return "products";
    }

    @GetMapping("/courses")
    public String coursesPage() {
        return "courses";
    }


}

