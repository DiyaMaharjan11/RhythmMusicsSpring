package com.CollegeProject.RhythmMusics.service;

import com.CollegeProject.RhythmMusics.model.Product;
import com.CollegeProject.RhythmMusics.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    //SAve product
    public Product saveProduct(Product product){
        return productRepository.save(product);
    }

    //GetAllProduct
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    //GetProductById
    public Product getProductById(int id){
        Product product = productRepository.findById(id).orElse(null);
        return product;
    }

    //DeleteById
    public Boolean deleteProduct(int id){
        Product product = productRepository.findById(id).orElse(null);
        if(!ObjectUtils.isEmpty(product)){
            productRepository.delete(product);
            return true;
        }
        return false;
    }


    //Product Edit
    public Product updateProduct(Product product, MultipartFile image){
        Product dbProduct = getProductById(product.getId()); //Get Product.

        String imageName = image.isEmpty() ? dbProduct.getImage() : image.getOriginalFilename();

        dbProduct.setTitle(product.getTitle());     //Update Title
        dbProduct.setDescription(product.getDescription()); //Update Description
        dbProduct.setCategory(product.getCategory());   //Update Category
        dbProduct.setPrice(product.getPrice());     //Update Price
        dbProduct.setStock(product.getStock());     //Update Stock
        dbProduct.setImage(imageName);      //Updaet Image
        dbProduct.setIsActive(product.getIsActive());   //Update Status

        Product updatedProduct = productRepository.save(dbProduct);

        if(!ObjectUtils.isEmpty(updatedProduct)){
            if(!image.isEmpty()){
                try{
                    // External upload directory (in user home)
                    String uploadDir = System.getProperty("user.home") + File.separator + "uploads" + File.separator + "product_img";
                    File dir = new File(uploadDir);
                    if (!dir.exists()) {
                        dir.mkdirs(); // create folder if not exists
                    }

                    Path path = Paths.get(uploadDir + File.separator + imageName);
                    Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                }catch (Exception e){
                    e.printStackTrace();
                }

            }
            return product;
        }
        return null;
    }

    //GetActive Products
    public List<Product> getAllActiveProducts(String category){
        if(ObjectUtils.isEmpty(category) || category.trim().isEmpty()){
            return productRepository.findByIsActiveTrue();
        } else {
            return productRepository.findByCategoryNameAndIsActiveTrue(category.trim());
        }
    }
}
