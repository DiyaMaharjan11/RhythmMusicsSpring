package com.CollegeProject.RhythmMusics.controller;

import com.CollegeProject.RhythmMusics.model.UserDtls;
import com.CollegeProject.RhythmMusics.service.UserService;
import com.CollegeProject.RhythmMusics.util.CommonUtil;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.util.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Controller
public class HomeController {

    @Autowired
    UserService userService;

    @Autowired
    CommonUtil commonUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/home")
    public String home() {
        return "index"; // Spring will look for index.css.html in templates
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

    @GetMapping("/products")
    public String productPage() {
        return "products";
    }

    @GetMapping("/courses")
    public String coursesPage() {
        return "courses";
    }

    @GetMapping("/about")
    public String aboutPage() {
        return "about"; // this will render about.html from templates
    }



    @GetMapping("/signup")
    public String signupPage() {
        return "signup";
    }



    //To Register
    @PostMapping("/saveUser")
    public String saveUser(@ModelAttribute UserDtls user,
                           @RequestParam("img") MultipartFile file,
                           HttpSession session) throws IOException {

        // if no file -> use default
        String imageName = file.isEmpty() ? "default.jpg" : file.getOriginalFilename();
        user.setProfileImage(imageName);

        // save user in DB first
        UserDtls savedUser = userService.saveUser(user);

        if (!ObjectUtils.isEmpty(savedUser)) {
            if (!file.isEmpty()) {
                // External upload directory (in user home)
                String uploadDir = System.getProperty("user.home") + File.separator + "uploads" + File.separator + "profile_img";
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs(); // create folder if not exists
                }

                Path path = Paths.get(uploadDir + File.separator + imageName);
                //TO see the User Image Path
                System.out.println("User Image Saved Folder : \n"+path);
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            }

            session.setAttribute("succMsg", "Saved Successfully. Use Login to access the Full Control");
        } else {
            session.setAttribute("errorMsg", "Something went wrong on server. While Registering user.");
        }

        return "redirect:/signup";
    }


    //ForgotPAssword Code

    @GetMapping("/forgot-password")
    public String showForgotPassword() {
        return "/forgot_password";
    }

    //To send mail
    @PostMapping("/forgot-password")
    public String processForgotPassword(@RequestParam String email, HttpSession session, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        UserDtls userByEmail = userService.getUserByEmail(email);

        if (ObjectUtils.isEmpty(userByEmail)) {
            session.setAttribute("errorMsg", "Invalid email");
        } else {
            String resetToken = UUID.randomUUID().toString();
            userService.updateUserResetToken(email, resetToken);

            //Generate Url
            String url = CommonUtil.generateUrl(request) + "/reset-password?token=" + resetToken;

            //To check Mail has been send or not.
            Boolean sendMail = commonUtil.sendMail(url, email);

            if (sendMail) {
                session.setAttribute("succMsg", "Please check your mail, Password reset link has been sent.");
            } else {
                session.setAttribute("errorMsg", "Something went wrong on Server mail not Sent.");
            }
        }
        return "redirect:/forgot-password";
    }

    @GetMapping("/reset-password")
    public String showResetPassword(@RequestParam String token, HttpSession session, Model m ) {

        UserDtls userByToken = userService.getUserByToken(token);
        //To check that User value or token is null or not
        if(userByToken == null){

            m.addAttribute("msg", "Link is Invalid or Expired");

            //we don't have to write this logic all again n again we can make a default page for that
//                    session.setAttribute("errrorMsg", "Invalid token or Url");
            return "message";
        }

        //It will be sent out as hidden to pass it in the page
        m.addAttribute("token", token);

        return "reset_password";
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String token,
                                @RequestParam String password,
                                @RequestParam(required = false) String confirmPassword,
                                HttpSession session,
                                Model m) {

        // Debug logging
        System.out.println("Received token: " + token);
        System.out.println("Received password length: " + (password != null ? password.length() : "null"));

        // Validate password confirmation if provided
        if (confirmPassword != null && !password.equals(confirmPassword)) {
            m.addAttribute("errorMsg", "Passwords do not match");
            m.addAttribute("token", token);
            return "reset_password";
        }

        UserDtls userByToken = userService.getUserByToken(token);

        if(userByToken == null) {
            System.out.println("User not found for token: " + token);
            m.addAttribute("errorMsg", "Link is Invalid or Expired");
            return "message";
        } else {
            System.out.println("User found: " + userByToken.getEmail());

            // Validate password strength
            if (password.length() < 6) {
                m.addAttribute("errorMsg", "Password must be at least 6 characters long");
                m.addAttribute("token", token);
                return "reset_password";
            }

            // Update user password
            userByToken.setPassword(passwordEncoder.encode(password));
            userByToken.setResetToken(null);

            UserDtls updatedUser = userService.updateUser(userByToken);

            if(updatedUser != null) {
                System.out.println("Password updated successfully for user: " + updatedUser.getEmail());
                session.setAttribute("succMsg", "Password Changed Successfully.");
                m.addAttribute("msg", "Password Changed Successfully.");
            } else {
                System.out.println("Failed to update user password");
                m.addAttribute("errorMsg", "Failed to update password. Please try again.");
            }

            return "message";
        }
    }
}

