package com.CollegeProject.RhythmMusics.repository;

import com.CollegeProject.RhythmMusics.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    //To Return the Category by name.
    Boolean existsByName(String name );

    //To show all the Category
    List<Category> findByIsActiveTrue();
}
