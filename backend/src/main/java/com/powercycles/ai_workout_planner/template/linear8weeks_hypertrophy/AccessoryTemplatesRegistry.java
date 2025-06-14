package com.powercycles.ai_workout_planner.template.linear8weeks_hypertrophy;

import com.powercycles.ai_workout_planner.model.ExerciseType;

import java.util.List;

public class AccessoryTemplatesRegistry {
    private static List<AccessoryTemplate> ALL = List.of(
        //EASY
        new AccessoryTemplate(
            "Easy squat",
            ExerciseType.SQUAT,
            AccessoryCategory.EASY,
            AccessorySchemeLists.getEasyAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Front squat",
            ExerciseType.SQUAT,
            AccessoryCategory.EASY,
            AccessorySchemeLists.getMiddleAccessorySchemes()
        ),
        //MIDDLE
        new AccessoryTemplate(
            "Standing biceps",
            ExerciseType.GPP,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getMiddleAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Middle bench",
            ExerciseType.PRESS,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getMiddleAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Lateral raises",
            ExerciseType.GPP,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getMiddleAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Leg press",
            ExerciseType.SQUAT,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getMiddleAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Standing press",
            ExerciseType.PRESS,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getEasyAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Glute bridge",
            ExerciseType.GPP,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getEasyAccessorySchemes()
        ),
        new AccessoryTemplate(
            "French press",
            ExerciseType.GPP,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getEasyAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Pull-ups",
            ExerciseType.GPP,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getMiddleAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Rear delt fly",
            ExerciseType.GPP,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getMiddleAccessorySchemes()
        ),
        //HARD
        new AccessoryTemplate(
            "Bent-over rows",
            ExerciseType.GPP,
            AccessoryCategory.HARD,
            AccessorySchemeLists.getHardAccessorySchemes()
        )
    );

    public static AccessoryTemplate byName(String name) {
        for(int i = 0; i < ALL.size(); i++) {
            if(ALL.get(i).getName().equals(name)) {
                return ALL.get(i);
            }
        }
        return null;
    }

    public static List<AccessoryTemplate> getAll() {
        return ALL;
    }
}
