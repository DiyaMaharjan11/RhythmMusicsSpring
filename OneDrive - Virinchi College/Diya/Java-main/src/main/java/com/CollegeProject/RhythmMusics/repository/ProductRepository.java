package com.CollegeProject.RhythmMusics.repository;

import com.CollegeProject.RhythmMusics.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product>  findByIsActiveTrue();

    //TO find Category
    List<Product> findByCategory(String category);

    @Query("SELECT p FROM Product p WHERE p.category = :categoryName AND p.isActive = true")
    List<Product> findByCategoryNameAndIsActiveTrue(@Param("categoryName") String categoryName);

}
