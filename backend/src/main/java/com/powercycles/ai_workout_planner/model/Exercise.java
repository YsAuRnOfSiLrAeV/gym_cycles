package com.powercycles.ai_workout_planner.model;

import java.util.List;

public class Exercise {
    private String name;
    private ExerciseType type;
    private List<ExercisePart> exerciseParts;

    public Exercise() {}

    public Exercise(String name, ExerciseType type, List<ExercisePart> exerciseParts) {
        this.name          = name;
        this.type          = type;
        this.exerciseParts = exerciseParts;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public ExerciseType getType() {
        return type;
    }
    public void setType(ExerciseType type) {
        this.type = type;
    }

    public List<ExercisePart> getExerciseParts() {
        return exerciseParts;
    }
    public void setExerciseParts(List<ExercisePart> exerciseParts) {
        this.exerciseParts = exerciseParts;
    }
}
