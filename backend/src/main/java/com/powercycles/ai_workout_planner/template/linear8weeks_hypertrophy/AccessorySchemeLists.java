package com.powercycles.ai_workout_planner.template.linear8weeks_hypertrophy;

import java.util.List;

public class AccessorySchemeLists {
    private static List<AccessoryScheme> easyAccessorySchemes = List.of(
        new AccessoryScheme(3, 12, 45), 
        new AccessoryScheme(4, 10, 45),
        new AccessoryScheme(4, 8, 50), 
        new AccessoryScheme(4, 12, 40),
        new AccessoryScheme(3, 8, 55), 
        new AccessoryScheme(3, 10, 50)
    );
    private static List<AccessoryScheme> middleAccessorySchemes = List.of(
        new AccessoryScheme(5, 12, 50), 
        new AccessoryScheme(4, 10, 55),
        new AccessoryScheme(4, 12, 50), 
        new AccessoryScheme(3, 10, 60),
        new AccessoryScheme(4, 8, 60)
    );
    private static List<AccessoryScheme> hardAccessorySchemes = List.of(
        new AccessoryScheme(3, 10, 67), 
        new AccessoryScheme(3, 8, 70),
        new AccessoryScheme(3, 12, 65),
        new AccessoryScheme(4, 8, 65),
        new AccessoryScheme(4, 10, 60)
    );

    public static List<AccessoryScheme> getEasyAccessorySchemes() {
        return easyAccessorySchemes;
    }

    public static List<AccessoryScheme> getMiddleAccessorySchemes() {
        return middleAccessorySchemes;
    }

    public static List<AccessoryScheme> getHardAccessorySchemes() {
        return hardAccessorySchemes;
    }
}
