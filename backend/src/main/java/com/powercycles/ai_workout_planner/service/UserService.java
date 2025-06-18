package com.powercycles.ai_workout_planner.service;

import com.powercycles.ai_workout_planner.model.ActivityLevel;
import com.powercycles.ai_workout_planner.model.User;
import com.powercycles.ai_workout_planner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(String name, String email, String password, int age, double weight, 
                           double height, ActivityLevel activityLevel, double benchPr, 
                           double squatPr, double deadliftPr) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Користувач з таким email вже існує");
        }

        User user = new User(name, email, password, age, weight, height, 
                           activityLevel, benchPr, squatPr, deadliftPr);

        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User updateUser(Long id, int age, double weight, double height, 
                          double benchPr, double squatPr, double deadliftPr) {

        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User with this ID was not found");
        }
        
        User user = userOptional.get();

        user.setAge(age);
        user.setWeight(weight);
        user.setHeight(height);
        user.setBenchPr(benchPr);
        user.setSquatPr(squatPr);
        user.setDeadliftPr(deadliftPr);

        return userRepository.save(user);
    }
} 