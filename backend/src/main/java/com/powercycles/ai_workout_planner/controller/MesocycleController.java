package com.powercycles.ai_workout_planner.controller;

import com.powercycles.ai_workout_planner.model.TrainingWeek;
import com.powercycles.ai_workout_planner.model.User;
import com.powercycles.ai_workout_planner.service.MesocycleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MesocycleController {
    private final MesocycleService mesocycleService;

    public MesocycleController(MesocycleService mesocycleService) {
        this.mesocycleService = mesocycleService;
    }

    @PostMapping("/strength/cycle")
    public List<TrainingWeek> generateStrength(@RequestBody User user) {
        return mesocycleService.generateStrengthCycle(user);
    }

    @PostMapping("/hypertrophy/cycle")
    public List<TrainingWeek> generateHypertrophy(@RequestBody User user) {
        return mesocycleService.generateHypertrophyCycle(user);
    }
}
