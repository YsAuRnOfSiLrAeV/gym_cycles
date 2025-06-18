package com.powercycles.ai_workout_planner.controller;

import com.powercycles.ai_workout_planner.model.ActivityLevel;
import com.powercycles.ai_workout_planner.model.User;
import com.powercycles.ai_workout_planner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        try {
            User user = userService.registerUser(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getAge(),
                request.getWeight(),
                request.getHeight(),
                request.getActivityLevel(),
                request.getBenchPr(),
                request.getSquatPr(),
                request.getDeadliftPr()
            );

            UserResponse response = new UserResponse(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error registering the user"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> getLoginUser(@RequestParam String email, @RequestParam String password) {
        List<User> users = userService.getAllUsers();
        UserResponse response = users.stream()
            .filter(user -> user.getEmail().equals(email) && user.getPassword().equals(password))
            .map(UserResponse::new)
            .findFirst()
            .orElse(null);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserUpdateRequest request) {
        try {
            User updatedUser = userService.updateUser(
                id,
                request.getAge(),
                request.getWeight(),
                request.getHeight(),
                request.getBenchPr(),
                request.getSquatPr(),
                request.getDeadliftPr()
            );

            UserResponse response = new UserResponse(updatedUser);
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error updating the user"));
        }
    }

    public static class UserRegistrationRequest {
        private String name;
        private String email;
        private String password;
        private int age;
        private double weight;
        private double height;
        private ActivityLevel activityLevel;
        private double benchPr;
        private double squatPr;
        private double deadliftPr;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        
        public int getAge() { return age; }
        public void setAge(int age) { this.age = age; }
        
        public double getWeight() { return weight; }
        public void setWeight(double weight) { this.weight = weight; }
        
        public double getHeight() { return height; }
        public void setHeight(double height) { this.height = height; }
        
        public ActivityLevel getActivityLevel() { return activityLevel; }
        public void setActivityLevel(ActivityLevel activityLevel) { this.activityLevel = activityLevel; }
        
        public double getBenchPr() { return benchPr; }
        public void setBenchPr(double benchPr) { this.benchPr = benchPr; }
        
        public double getSquatPr() { return squatPr; }
        public void setSquatPr(double squatPr) { this.squatPr = squatPr; }
        
        public double getDeadliftPr() { return deadliftPr; }
        public void setDeadliftPr(double deadliftPr) { this.deadliftPr = deadliftPr; }
    }

    public static class UserUpdateRequest {
        private int age;
        private double weight;
        private double height;
        private double benchPr;
        private double squatPr;
        private double deadliftPr;

        public int getAge() { return age; }
        public void setAge(int age) { this.age = age; }
        
        public double getWeight() { return weight; }
        public void setWeight(double weight) { this.weight = weight; }
        
        public double getHeight() { return height; }
        public void setHeight(double height) { this.height = height; }
        
        public double getBenchPr() { return benchPr; }
        public void setBenchPr(double benchPr) { this.benchPr = benchPr; }
        
        public double getSquatPr() { return squatPr; }
        public void setSquatPr(double squatPr) { this.squatPr = squatPr; }
        
        public double getDeadliftPr() { return deadliftPr; }
        public void setDeadliftPr(double deadliftPr) { this.deadliftPr = deadliftPr; }
    }

    public static class UserResponse {
        private Long id;
        private String name;
        private String email;
        private int age;
        private double weight;
        private double height;
        private ActivityLevel activityLevel;
        private double benchPr;
        private double squatPr;
        private double deadliftPr;

        public UserResponse(User user) {
            this.id = user.getId();
            this.name = user.getName();
            this.email = user.getEmail();
            this.age = user.getAge();
            this.weight = user.getWeight();
            this.height = user.getHeight();
            this.activityLevel = user.getActivityLevel();
            this.benchPr = user.getBenchPr();
            this.squatPr = user.getSquatPr();
            this.deadliftPr = user.getDeadliftPr();
        }

        public Long getId() { return id; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public int getAge() { return age; }
        public double getWeight() { return weight; }
        public double getHeight() { return height; }
        public ActivityLevel getActivityLevel() { return activityLevel; }
        public double getBenchPr() { return benchPr; }
        public double getSquatPr() { return squatPr; }
        public double getDeadliftPr() { return deadliftPr; }
    }
} 