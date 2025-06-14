package com.powercycles.ai_workout_planner.model;

import java.util.ArrayList;
import java.util.List;

public class TrainingWeek {
    private int weekNumber;
    private List<TrainingDay> weekStructure;

    public TrainingWeek() {
        this.weekStructure = new ArrayList<>();
    }

    public TrainingWeek(int weekNumber, List<TrainingDay> weekStructure) {
        this.weekNumber    = weekNumber;
        this.weekStructure = weekStructure;
    }

    public int getWeekNumber() {
        return weekNumber;
    }
    public void setWeekNumber(int weekNumber) {
        this.weekNumber = weekNumber;
    }

    public List<TrainingDay> getWeekStructure() {
        return weekStructure;
    }
    public void setWeekStructure(List<TrainingDay> weekStructure) {
        this.weekStructure = weekStructure;
    }
}