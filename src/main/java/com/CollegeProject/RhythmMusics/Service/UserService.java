package com.CollegeProject.RhythmMusics.Service;

import com.CollegeProject.RhythmMusics.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
    @Autowired
    UserRepository userRepository;


}
