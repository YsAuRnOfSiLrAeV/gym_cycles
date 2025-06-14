package com.powercycles.ai_workout_planner.template.linear8weeks_powerlifting;

import java.util.List;

public class AccessorySchemeLists {
    private static List<AccessoryScheme> easyAccessorySchemes = List.of(
        new AccessoryScheme(5, 5, 45), 
        new AccessoryScheme(3, 6, 45),
        new AccessoryScheme(3, 5, 50), 
        new AccessoryScheme(5, 6, 40),
        new AccessoryScheme(4, 5, 50), 
        new AccessoryScheme(4, 6, 45),
        new AccessoryScheme(4, 4, 55)
    );
    private static List<AccessoryScheme> middleAccessorySchemes = List.of(
        new AccessoryScheme(5, 5, 55), 
        new AccessoryScheme(5, 4, 65),
        new AccessoryScheme(5, 6, 55), 
        new AccessoryScheme(4, 5, 60),
        new AccessoryScheme(4, 6, 55)
    );
    private static List<AccessoryScheme> hardAccessorySchemes = List.of(
        new AccessoryScheme(5, 5, 60), 
        new AccessoryScheme(5, 6, 65),
        new AccessoryScheme(4, 6, 70)
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
