package com.CollegeProject.RhythmMusics.Service;

import com.CollegeProject.RhythmMusics.Repository.UserRepository;
import com.CollegeProject.RhythmMusics.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService
{
    @Autowired
    UserRepository userRepository;

    //to Abstract all the users data
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    //to add users data
    public User addUsers(User user){
        return userRepository.save(user);
    }

    //to delete User by Id
    public void  deleteUser(int id){
        userRepository.deleteById(id);
    }


}
