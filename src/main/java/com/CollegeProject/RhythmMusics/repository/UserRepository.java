package com.CollegeProject.RhythmMusics.repository;

import com.CollegeProject.RhythmMusics.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {

}
