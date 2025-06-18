package com.powercycles.ai_workout_planner.repository;

import com.powercycles.ai_workout_planner.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<User> findByAge(int age);
    
    List<User> findByAgeBetween(int minAge, int maxAge);
    
    List<User> findByNameContainingIgnoreCase(String name);
} 