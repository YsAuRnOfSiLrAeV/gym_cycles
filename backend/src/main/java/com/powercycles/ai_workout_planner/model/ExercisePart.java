package com.powercycles.ai_workout_planner.model;

public class ExercisePart {
    private double percentage;
    private double loadKg;
    private int sets;
    private int reps;

    public ExercisePart() {}

    public ExercisePart(int percentage, double loadKg, int sets, int reps) {
        this.percentage = percentage;
        this.sets       = sets;
        this.reps       = reps;
        this.loadKg     = loadKg;
    }

    public double getPercentage() {
        return percentage;
    }
    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public double getLoadKg() {
        return loadKg;
    }
    public void setLoadKg(double loadKg) {
        this.loadKg = loadKg;
    }

    public int getSets() {
        return sets;
    }
    public void setSets(int sets) {
        this.sets = sets;
    }

    public int getReps() {
        return reps;
    }
    public void setReps(int reps) {
        this.reps = reps;
    }
}
