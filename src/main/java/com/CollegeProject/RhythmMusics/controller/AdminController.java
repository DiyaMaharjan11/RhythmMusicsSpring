package com.CollegeProject.RhythmMusics.controller;

import com.CollegeProject.RhythmMusics.model.Cart;
import com.CollegeProject.RhythmMusics.service.CartService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.ObjectUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private CartService cartService;

    @PostMapping("/saveCart")
    public String saveCart(@ModelAttribute Cart cart, @RequestParam ("file") MultipartFile file, HttpSession session) throws IOException {
       //it is used for tracinng the file.
        String imageName = file!=null ? file.getOriginalFilename(): "default.jpg";
        cart.setImageName(imageName);

        if(cartService.existCart(cart.getName())) {
            session.setAttribute("errorMsg", "Cart Name Already Exists");
        }else {
            Cart saveCart = cartService.saveCart(cart);

                File saveFile = new ClassPathResource("/static/img").getFile();
                Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + "cart_img" + File.separator + file.getOriginalFilename());
                System.out.println(path);
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                session.setAttribute("succMsg", "Saved Successfully");

        }
        return "redirect:/admin/cart"; //dekhauney file.
    }

}
