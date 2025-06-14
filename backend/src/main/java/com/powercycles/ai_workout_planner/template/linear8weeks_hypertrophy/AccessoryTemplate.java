package com.powercycles.ai_workout_planner.template.linear8weeks_hypertrophy;

import com.powercycles.ai_workout_planner.model.ExerciseType;
import java.util.List;

public class AccessoryTemplate {
    private final String name;
    private final ExerciseType type;
    private final AccessoryCategory category;
    private final List<AccessoryScheme> schemes;

    public AccessoryTemplate(
        String name, ExerciseType type,
        AccessoryCategory category, List<AccessoryScheme> schemes
    ) {
        this.name     = name;
        this.type     = type;
        this.category = category;
        this.schemes  = schemes;
    }

    public String getName() {
        return name;
    }

    public ExerciseType getType() {
        return type;
    }

    public AccessoryCategory getCategory() {
        return category;
    }

    public List<AccessoryScheme> getSchemes() {
        return schemes;
    }
}
