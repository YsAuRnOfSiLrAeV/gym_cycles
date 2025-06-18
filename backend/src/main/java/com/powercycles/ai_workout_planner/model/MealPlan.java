package com.powercycles.ai_workout_planner.model;

import java.util.List;

public class MealPlan {
    private int calories;
    private double proteins;
    private double fats;
    private double carbs;

    private List<String> exampleMenu1;
    private List<String> exampleMenu2;

    public MealPlan() {}

    public MealPlan(int calories, double proteins, double fats, double carbs,
                    List<String> exampleMenu1, List<String> exampleMenu2) {
        this.calories     = calories;
        this.proteins     = proteins;
        this.fats         = fats;
        this.carbs        = carbs;
        this.exampleMenu1 = exampleMenu1;
        this.exampleMenu2 = exampleMenu2;
    }

    public int getCalories() {
        return calories;
    }
    public void setCalories(int calories) {
        this.calories = calories;
    }

    public double getProteins() {
        return proteins;
    }
    public void setProteins(double proteins) {
        this.proteins = proteins;
    }

    public double getFats() {
        return fats;
    }
    public void setFats(double fats) {
        this.fats = fats;
    }

    public double getCarbs() {
        return carbs;
    }
    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public List<String> getExampleMenu1() {
        return exampleMenu1;
    }
    public void setExampleMenu1(List<String> exampleMenu1) {
        this.exampleMenu1 = exampleMenu1;
    }

    public List<String> getExampleMenu2() {
        return exampleMenu2;
    }
    public void setExampleMenu2(List<String> exampleMenu2) {
        this.exampleMenu2 = exampleMenu2;
    }
}
