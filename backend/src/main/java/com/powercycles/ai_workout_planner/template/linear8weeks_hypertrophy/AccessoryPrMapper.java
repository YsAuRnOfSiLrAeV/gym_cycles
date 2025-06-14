package com.powercycles.ai_workout_planner.template.linear8weeks_hypertrophy;

import com.powercycles.ai_workout_planner.model.User;
import java.util.Map;
import java.util.function.Function;
import static java.util.Map.entry;

public class AccessoryPrMapper {
    private static final Map<String, Function<User, Double>> MULTIPLIERS = Map.ofEntries(
        entry("Middle bench"    , User::getBenchPr),
        entry("Easy squat"      , User::getSquatPr),
        entry("Bent-over rows"  , u -> u.getDeadliftPr() * 0.56),
        entry("Standing press"  , u -> u.getBenchPr() * 0.60),
        entry("French press"    , u -> u.getBenchPr() * 0.46),
        entry("Front squat"     , u -> u.getSquatPr() * 0.75),
        entry("Standing biceps" , u -> u.getBenchPr() * 0.35),
        entry("Leg press"       , u -> u.getSquatPr() * 1.9),
        entry("Lateral raises"  , u -> u.getBenchPr() * 0.45 * 0.5),
        entry("Pull-ups"        , u -> u.getDeadliftPr() * 0.72),
        entry("Glute bridge"    , u -> u.getSquatPr() * 0.875),
        entry("Rear delt fly"   , u -> u.getSquatPr() * 0.18 * 0.5)
    );

    public static double getPr(User user, String exerciseName) {
        return MULTIPLIERS
               .getOrDefault(exerciseName, u -> 0.0)
               .apply(user);
    }
}
