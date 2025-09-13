package com.CollegeProject.RhythmMusics.service;

import com.CollegeProject.RhythmMusics.model.Category;
import com.CollegeProject.RhythmMusics.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    //To Save the Category
    public Category saveCategory(Category category){
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategory(){
        return categoryRepository.findAll();
    }

    //To check if that Category exists or not.
    public Boolean existCategory(String categoryName){
        return categoryRepository.existsByName(categoryName);
    }

    //To delete the Category
    public Boolean deleteCategory(int id){
        Category category = categoryRepository.findById(id).orElse(null);

        if(!ObjectUtils.isEmpty(category)){
            categoryRepository.delete(category);
            return true;
        }
        return false;
    }

    //To get All the Category
    public Category getCategoryById(int id){
        Category category = categoryRepository.findById(id).orElse(null);
        return category;
    }

    //To get the Category that are available and Active for the All Users.
    public List<Category> getAllActiveCategory(){
        List<Category> categories = categoryRepository.findByIsActiveTrue();
        return categories;
    };
}
