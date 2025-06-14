package com.powercycles.ai_workout_planner.model;

import java.util.List;

public class MesocyclePlan {
    private CycleType cycleType;
    private List<TrainingWeek> mesocycleStructure;

    public MesocyclePlan() {}

    public MesocyclePlan(CycleType cycleType, List<TrainingWeek> mesocycleStructure) {
        this.cycleType           = cycleType;
        this.mesocycleStructure  = mesocycleStructure;
    }

    public CycleType getCycleType() {
        return cycleType;
    }
    public void setCycleType(CycleType cycleType) {
        this.cycleType = cycleType;
    }

    public List<TrainingWeek> getMesocycleStructure() {
        return mesocycleStructure;
    }
    public void setMesocycleStructure(List<TrainingWeek> mesocycleStructure) {
        this.mesocycleStructure = mesocycleStructure;
    }
}
