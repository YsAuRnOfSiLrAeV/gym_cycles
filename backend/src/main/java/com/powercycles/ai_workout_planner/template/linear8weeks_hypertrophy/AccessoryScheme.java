package com.powercycles.ai_workout_planner.template.linear8weeks_hypertrophy;

public class AccessoryScheme {
    private final int sets;
    private final int reps;
    private final int percent;

    public AccessoryScheme(int sets, int reps, int percent) {
        this.sets = sets;
        this.reps = reps;
        this.percent = percent;
    }

    public int getSets() {
        return sets;
    }

    public int getReps() {
        return reps;
    }

    public int getPercent() {
        return percent;
    }
}
