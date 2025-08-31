package com.CollegeProject.RhythmMusics.Repository;

import com.CollegeProject.RhythmMusics.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

//it provides the Crud Functionality.
//Add , Delete , Update , Read
public interface UserRepository extends JpaRepository<User,Integer> {
}
