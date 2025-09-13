package com.CollegeProject.RhythmMusics.controller;

import com.CollegeProject.RhythmMusics.model.Category;
import com.CollegeProject.RhythmMusics.model.Product;
import com.CollegeProject.RhythmMusics.model.UserDtls;
import com.CollegeProject.RhythmMusics.service.CartService;
import com.CollegeProject.RhythmMusics.service.CategoryService;
import com.CollegeProject.RhythmMusics.service.ProductService;
import com.CollegeProject.RhythmMusics.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.ObjectUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    ProductService productService;

    //To Get  User details After Login
    @ModelAttribute
    public void getUserDetails(Principal p, Model m) {
        if(p != null ){
            String email = p.getName();
            UserDtls userDtls = userService.getUserByEmail(email);
            m.addAttribute("user", userDtls);
        }

        List<Category> allActiveCategory = categoryService.getAllActiveCategory();
        m.addAttribute("categorys", allActiveCategory);
    }

    //Admin Dashboard
    @GetMapping("/")
    public String index() {
        return "admin/index";
    }

    //TO loadAdd Product
    @GetMapping("/loadAddProduct")
    public String loadAddProduct(Model m){
        List<Category> categories = categoryService.getAllCategory();
        m.addAttribute("categories", categories);
        return "admin/add_product";
    }

    //To Get Category
    @GetMapping("/category")
    public String category(Model m){
        m.addAttribute("categorys" , categoryService.getAllCategory());
        return "admin/category";
    }

    //to Save Category
    @PostMapping("/saveCategory")
    public String saveCategory(@ModelAttribute Category category,
                               @RequestParam("file") MultipartFile file,
                               HttpSession session) throws IOException {

        String imageName = file != null ? file.getOriginalFilename() : "default.jpg";
        category.setImageName(imageName);

        Boolean existCategory = categoryService.existCategory(category.getName());

        if(existCategory){
            session.setAttribute("errorMsg", "Category Already exists");
        } else {
            Category saveCategory = categoryService.saveCategory(category);

            if(ObjectUtils.isEmpty(saveCategory)){
                session.setAttribute("errorMsg", "Category not saved");
            } else {
                if(!file.isEmpty()){
                    // External upload directory (in user home)
                    String uploadDir = System.getProperty("user.home") + File.separator + "uploads" + File.separator + "category_img";
                    File dir = new File(uploadDir);
                    if (!dir.exists()) {
                        dir.mkdirs(); // create folder if not exists
                    }

                    Path path = Paths.get(uploadDir + File.separator + imageName);
                    Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                }
                session.setAttribute("succMsg", "saved Successfully");
            }
        }

        return "redirect:/admin/category";

    }

    //To delete the Category
    @GetMapping("/deleteCategory/{id}")
    public String deleteCategory(@PathVariable int id , HttpSession session){
        Boolean deleteCategory = categoryService.deleteCategory(id);
        if(deleteCategory){
            session.setAttribute("succMsg", "Category Deleted");
        }else {
            session.setAttribute("errorMsg", "Category not deleted. Something wrong went on the Server");
        }

        return "redirect:/admin/category";
    }

    @GetMapping("/loadEditCategory/{id}")
    public String loadEditCategory(@PathVariable int id , Model m){
        m.addAttribute("category", categoryService.getCategoryById(id));
        return "admin/edit_category";
    }

    @PostMapping("/updateCategory")
    public String updateCategory(@ModelAttribute Category category, @RequestParam("file") MultipartFile file,
                                 HttpSession session) throws IOException {

        Category oldCategory = categoryService.getCategoryById(category.getId());
        String imageName = file.isEmpty() ? oldCategory.getImageName() : file.getOriginalFilename();

        if(!ObjectUtils.isEmpty(category)){
            oldCategory.setImageName(imageName);
            oldCategory.setIsActive(category.getIsActive());
            oldCategory.setName(category.getName());
        }

        Category updateCategory = categoryService.saveCategory(oldCategory);

        if(!ObjectUtils.isEmpty(updateCategory)){

            if(!file.isEmpty()){
                // External upload directory (in user home)
                String uploadDir = System.getProperty("user.home") + File.separator + "uploads" + File.separator + "category_img";
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs(); // create folder if not exists
                }

                Path path = Paths.get(uploadDir + File.separator + imageName);
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            }


            session.setAttribute("succMsg", "Category update Success");
        }else {
            session.setAttribute("errorMsg", "Something went wrong on the Server");
        }

        //TO getCategory by it's Id from the Database.
        return "redirect:/admin/loadEditCategory/"+ category.getId() ;
    }


    //Product
    @GetMapping("/products")
    public String loadViewProducts(Model m){
        m.addAttribute("products", productService.getAllProducts());
        return "admin/products";
    }

    @PostMapping("/saveProduct")
    public String saveProduct(@ModelAttribute Product product, @RequestParam("file") MultipartFile image,
                              HttpSession session) throws IOException{

        String imageName = image.isEmpty() ? "default.jpg" : image.getOriginalFilename();
        product.setImage(imageName);    //Image Saving/Setting

        Product saveProduct = productService.saveProduct(product);


        if(!ObjectUtils.isEmpty(saveProduct)){
            if(!image.isEmpty()){
                String uploadDir = System.getProperty("user.home") + File.separator + "uploads" + File.separator + "product_img";
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs(); // create folder if not exists
                }

                Path path = Paths.get(uploadDir + File.separator + imageName);
                Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            }
            session.setAttribute("succMsg", "Product Saved Successfully");
        } else {
            session.setAttribute("errorMsg" , "Something went wrond on Server");
        }

        return "redirect:/admin/loadAddProduct";
    }


    @GetMapping("/deleteProduct/{id}")
    public String deleteProduct(@PathVariable int id, HttpSession session){
        Boolean deleteProduct = productService.deleteProduct(id);
        if(deleteProduct){
            session.setAttribute("succMsg", "Product Deleted");
        } else {
            session.setAttribute("errorMsg", "Something went wrong on the Server");
        }

        return "redirect:/admin/products";
    }


    @GetMapping("/editProduct/{id}")
    public String editProduct(@PathVariable int id, Model m){
        m.addAttribute("product" , productService.getProductById(id));
        m.addAttribute("categories" , categoryService.getAllCategory());
        return "admin/edit_product";
    }


    @PostMapping("/updateProduct")
    public String updateProduct(@ModelAttribute Product product,@RequestParam("file")MultipartFile image,  HttpSession session , Model m){
        Product updateProduct = productService.updateProduct(product , image);
        if(!ObjectUtils.isEmpty(updateProduct)){
            session.setAttribute("succMsg" , "Product Update Success");
        } else {
            session.setAttribute("errorMsg" , "Something went wrong on Server. Please Waiiiiit.");
        }
        return "redirect:/admin/editProduct/" + product.getId();
    }
}
