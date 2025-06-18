package com.powercycles.ai_workout_planner.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    @NotBlank(message = "Name cannot be empty")
    private String name;
    
    @Column(nullable = false, unique = true, length = 150)
    @Email(message = "Please enter a valid email")
    @NotBlank(message = "Email cannot be empty")
    private String email;
    
    @Column(nullable = false)
    @NotBlank(message = "Password cannot be empty")
    @Size(min = 6, message = "Password must contain at least 6 characters")
    private String password;
    
    @Column(nullable = false)
    @Min(value = 16, message = "Age must be at least 16 years")
    @Max(value = 100, message = "Age must not exceed 100 years")
    private int age;
    
    @Column(nullable = false)
    @DecimalMin(value = "30.0", message = "Weight must be at least 30 kg")
    @DecimalMax(value = "300.0", message = "Weight must not exceed 300 kg")
    private double weight;
    
    @Column(nullable = false)
    @DecimalMin(value = "100.0", message = "Height must be at least 100 cm")
    @DecimalMax(value = "250.0", message = "Height must not exceed 250 cm")
    private double height;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "activity_level")
    private ActivityLevel activityLevel;
    
    @Column(name = "bench_pr")
    @DecimalMin(value = "0.0", message = "Bench PR cannot be negative")
    private double benchPr;
    
    @Column(name = "squat_pr")
    @DecimalMin(value = "0.0", message = "Squat PR cannot be negative")
    private double squatPr;
    
    @Column(name = "deadlift_pr")
    @DecimalMin(value = "0.0", message = "Deadlift PR cannot be negative")
    private double deadliftPr;

    public User() {}

    public User(String name, String email, String password, int age, double weight, double height,
                ActivityLevel activityLevel,
                double benchPr, double squatPr, double deadliftPr) {
        this.name           = name;
        this.email          = email;
        this.password       = password;
        this.age            = age;
        this.weight         = weight;
        this.height         = height;
        this.activityLevel  = activityLevel;
        this.benchPr        = benchPr;
        this.squatPr        = squatPr;
        this.deadliftPr     = deadliftPr;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }

    public double getWeight() {
        return weight;
    }
    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getHeight() {
        return height;
    }
    public void setHeight(double height) {
        this.height = height;
    }

    public ActivityLevel getActivityLevel() {
        return activityLevel;
    }
    public void setActivityLevel(ActivityLevel activityLevel) {
        this.activityLevel = activityLevel;
    }

    public double getBenchPr() {
        return benchPr;
    }
    public void setBenchPr(double benchPr) {
        this.benchPr = benchPr;
    }

    public double getSquatPr() {
        return squatPr;
    }
    public void setSquatPr(double squatPr) {
        this.squatPr = squatPr;
    }

    public double getDeadliftPr() {
        return deadliftPr;
    }
    public void setDeadliftPr(double deadliftPr) {
        this.deadliftPr = deadliftPr;
    }
}
