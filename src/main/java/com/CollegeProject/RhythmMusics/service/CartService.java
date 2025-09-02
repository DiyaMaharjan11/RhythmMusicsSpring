package com.CollegeProject.RhythmMusics.service;

import com.CollegeProject.RhythmMusics.model.Cart;
import com.CollegeProject.RhythmMusics.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    //save
    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public boolean existCart(String cartName) {
        return cartRepository.exists(cartName);
    }



}
