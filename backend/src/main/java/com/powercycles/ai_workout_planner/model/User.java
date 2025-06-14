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
    @NotBlank(message = "Ім'я не може бути порожнім")
    private String name;
    
    @Column(nullable = false, unique = true, length = 150)
    @Email(message = "Введіть коректну електронну пошту")
    @NotBlank(message = "Email не може бути порожнім")
    private String email;
    
    @Column(nullable = false)
    @NotBlank(message = "Пароль не може бути порожнім")
    @Size(min = 6, message = "Пароль повинен містити мінімум 6 символів")
    private String password;
    
    @Column(nullable = false)
    @Min(value = 16, message = "Вік повинен бути не менше 16 років")
    @Max(value = 100, message = "Вік повинен бути не більше 100 років")
    private int age;
    
    @Column(nullable = false)
    @DecimalMin(value = "30.0", message = "Вага повинна бути не менше 30 кг")
    @DecimalMax(value = "300.0", message = "Вага повинна бути не більше 300 кг")
    private double weight;
    
    @Column(nullable = false)
    @DecimalMin(value = "100.0", message = "Зріст повинен бути не менше 100 см")
    @DecimalMax(value = "250.0", message = "Зріст повинен бути не більше 250 см")
    private double height;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "activity_level")
    private ActivityLevel activityLevel;
    
    @Column(name = "bench_pr")
    @DecimalMin(value = "0.0", message = "ПМ в жимі не може бути від'ємним")
    private double benchPr;
    
    @Column(name = "squat_pr")
    @DecimalMin(value = "0.0", message = "ПМ в присяді не може бути від'ємним")
    private double squatPr;
    
    @Column(name = "deadlift_pr")
    @DecimalMin(value = "0.0", message = "ПМ в становій не може бути від'ємним")
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
