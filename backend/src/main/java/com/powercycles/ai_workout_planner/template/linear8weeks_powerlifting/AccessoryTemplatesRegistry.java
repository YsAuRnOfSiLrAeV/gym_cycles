package com.powercycles.ai_workout_planner.template.linear8weeks_powerlifting;

import com.powercycles.ai_workout_planner.model.ExerciseType;

import java.util.List;

public class AccessoryTemplatesRegistry {
    private static List<AccessoryTemplate> ALL = List.of(
        //EASY
        new AccessoryTemplate(
            "Easy bench",
            ExerciseType.PRESS,
            AccessoryCategory.EASY,
            AccessorySchemeLists.getEasyAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Easy squat",
            ExerciseType.SQUAT,
            AccessoryCategory.EASY,
            AccessorySchemeLists.getEasyAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Dumbbell press",
            ExerciseType.PRESS,
            AccessoryCategory.EASY,
            AccessorySchemeLists.getEasyAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Standing press",
            ExerciseType.PRESS,
            AccessoryCategory.EASY,
            AccessorySchemeLists.getEasyAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Wide squat",
            ExerciseType.SQUAT,
            AccessoryCategory.EASY,
            AccessorySchemeLists.getEasyAccessorySchemes()
        ),
        new AccessoryTemplate(
            "French press",
            ExerciseType.GPP,
            AccessoryCategory.EASY,
            AccessorySchemeLists.getEasyAccessorySchemes()
        ),
        //MIDDLE
        new AccessoryTemplate(
            "Chest squat",
            ExerciseType.SQUAT,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getMiddleAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Standing biceps",
            ExerciseType.GPP,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getMiddleAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Good morning",
            ExerciseType.PULL,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getMiddleAccessorySchemes()
        ),
        new AccessoryTemplate(
            "Lateral raises",
            ExerciseType.GPP,
            AccessoryCategory.MIDDLE,
            AccessorySchemeLists.getMiddleAccessorySchemes()
        ),
        //HARD
        new AccessoryTemplate(
            "Lat pulldown",
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
