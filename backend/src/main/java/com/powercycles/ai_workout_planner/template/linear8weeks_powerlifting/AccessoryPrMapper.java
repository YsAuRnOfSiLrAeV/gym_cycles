package com.powercycles.ai_workout_planner.template.linear8weeks_powerlifting;

import com.powercycles.ai_workout_planner.model.User;
import java.util.Map;
import java.util.function.Function;
import static java.util.Map.entry;

public class AccessoryPrMapper {
    private static final Map<String, Function<User, Double>> MULTIPLIERS = Map.ofEntries(
        entry("Easy bench"      , User::getBenchPr),
        entry("Easy squat"      , User::getSquatPr),
        entry("Dumbbell press"  , u -> u.getBenchPr() * 0.32),
        entry("Standing press"  , u -> u.getBenchPr() * 0.60),
        entry("French press"    , u -> u.getBenchPr() * 0.46),
        entry("Chest squat"     , u -> u.getSquatPr() * 0.75),
        entry("Standing biceps" , u -> u.getBenchPr() * 0.35),
        entry("Good morning"    , u -> u.getDeadliftPr() * 0.55),
        entry("Lateral raises"  , u -> u.getBenchPr() * 0.45 * 0.5),
        entry("Lat pulldown"    , u -> u.getDeadliftPr() * 0.52),
        entry("Wide squat"      , u -> u.getSquatPr() * 0.875)
    );

    public static double getPr(User user, String exerciseName) {
        return MULTIPLIERS
               .getOrDefault(exerciseName, u -> 0.0)
               .apply(user);
    }
}
