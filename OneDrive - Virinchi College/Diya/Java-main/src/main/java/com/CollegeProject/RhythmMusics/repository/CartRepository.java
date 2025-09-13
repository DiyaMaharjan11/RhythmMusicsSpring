package com.CollegeProject.RhythmMusics.repository;

import com.CollegeProject.RhythmMusics.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Integer> {
    boolean existsByCartName(String cartName);
}
