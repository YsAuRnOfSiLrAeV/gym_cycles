package com.powercycles.ai_workout_planner.service;

import com.powercycles.ai_workout_planner.model.TrainingWeek;
import com.powercycles.ai_workout_planner.model.User;
import com.powercycles.ai_workout_planner.template.linear8weeks_powerlifting.LinearPowerliftingMesocycleGenerator;
import com.powercycles.ai_workout_planner.template.linear8weeks_hypertrophy.LinearHypertrophyMesocycleGenerator;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MesocycleService {
    private final LinearPowerliftingMesocycleGenerator strengthGen;
    private final LinearHypertrophyMesocycleGenerator hypertrophyGen;

    public MesocycleService(LinearPowerliftingMesocycleGenerator strengthGen,
                            LinearHypertrophyMesocycleGenerator hypertrophyGen) {
        this.strengthGen = strengthGen;
        this.hypertrophyGen = hypertrophyGen;
    }

    public List<TrainingWeek> generateStrengthCycle(User user) {
        return strengthGen.generateLinearPowerliftingMesocycle(user);
    }

    public List<TrainingWeek> generateHypertrophyCycle(User user) {
        return hypertrophyGen.generateLinearHypertrophyMesocycle(user);
    }
}
