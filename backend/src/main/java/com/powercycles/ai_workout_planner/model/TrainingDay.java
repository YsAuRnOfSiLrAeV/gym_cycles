package com.powercycles.ai_workout_planner.model;

import java.util.ArrayList;
import java.util.List;

public class TrainingDay {
    private int dayNumber;
    private List<Exercise> dayStructure;

    public TrainingDay() {
        this.dayStructure = new ArrayList<>();
    }

    public TrainingDay(int dayNumber, List<Exercise> dayStructure) {
        this.dayNumber    = dayNumber;
        this.dayStructure = dayStructure;
    }

    public int getDayNumber() {
        return dayNumber;
    }
    public void setDayNumber(int dayNumber) {
        this.dayNumber = dayNumber;
    }

    public List<Exercise> getDayStructure() {
        return dayStructure;
    }
    public void setDayStructure(List<Exercise> dayStructure) {
        this.dayStructure = dayStructure;
    }
}