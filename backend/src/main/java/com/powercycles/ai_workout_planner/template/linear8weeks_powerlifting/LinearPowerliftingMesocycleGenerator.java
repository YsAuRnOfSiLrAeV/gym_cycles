package com.powercycles.ai_workout_planner.template.linear8weeks_powerlifting;

import org.springframework.stereotype.Component;
import com.powercycles.ai_workout_planner.model.Exercise;
import com.powercycles.ai_workout_planner.model.ExercisePart;
import com.powercycles.ai_workout_planner.model.ExerciseType;
import com.powercycles.ai_workout_planner.model.TrainingDay;
import com.powercycles.ai_workout_planner.model.TrainingWeek;
import com.powercycles.ai_workout_planner.model.User;

import java.util.Random;
import java.util.ArrayList;
import java.util.List;

@Component
public class LinearPowerliftingMesocycleGenerator {

    final Random rand = new Random();

    public List<TrainingWeek> generateLinearPowerliftingMesocycle(User user) {
        List<TrainingWeek> generatedMesocycle = new ArrayList<>();
        final int[] PERC = {70, 75, 80, 85};

        for (int i = 1; i <= 8; i++) {
            if (i == 5) {
                user.setBenchPr(user.getBenchPr() * 1.1);
                user.setSquatPr(user.getSquatPr() * 1.1);
                user.setDeadliftPr(user.getDeadliftPr() * 1.1);
            }

            int percent = PERC[(i - 1) % PERC.length];
            generatedMesocycle.add(generateWeek(user, i, percent));
        }

        return generatedMesocycle;
    }

    private TrainingWeek generateWeek(User user, int weekNumber, int mainExercisesPercent) {
        TrainingWeek trainingWeek = new TrainingWeek();
        trainingWeek.setWeekNumber(weekNumber);

        for (int day = 1; day <= 3; day++) {
            trainingWeek.getWeekStructure().add(generateDay(user, day, mainExercisesPercent));
        }

        return trainingWeek;
    }

    private TrainingDay generateDay(User user, int dayNumber, int mainExercisesPercent) {
        TrainingDay trainingDay = new TrainingDay();
        trainingDay.setDayNumber(dayNumber);

        for (int ex = 1; ex <= 5; ex++) {
            trainingDay.getDayStructure().add(generateExercise(user, dayNumber, ex, mainExercisesPercent));
        }

        return trainingDay;
    }

    private Exercise generateExercise(User user, int dayNumber, int exerciseNumber, int mainExercisesPercent) {
        String name = getNameForDay(dayNumber, exerciseNumber);
        Exercise exercise = new Exercise();
        exercise.setName(name);

        if (name.equals("Squat") || name.equals("Bench") || name.equals("Deadlift")) {
            ExerciseType type = switch (name) {
                case "Squat"    -> ExerciseType.SQUAT;
                case "Bench"    -> ExerciseType.PRESS;
                default         -> ExerciseType.PULL;
            };
            exercise.setType(type);

            ExercisePart part = new ExercisePart();
            part.setPercentage(mainExercisesPercent);
            part.setSets(4);
            part.setReps(4);
            double pr = switch (name) {
                case "Squat"    -> user.getSquatPr();
                case "Bench"    -> user.getBenchPr();
                default         -> user.getDeadliftPr();
            };
            part.setLoadKg(pr * mainExercisesPercent / 100.0);
            exercise.setExerciseParts(List.of(part));
        }
        else {
            AccessoryTemplate tpl = AccessoryTemplatesRegistry.byName(name);
            exercise.setType(tpl.getType());

            List<AccessoryScheme> schemes = tpl.getSchemes();
            AccessoryScheme chosen = schemes.get(rand.nextInt(schemes.size()));

            ExercisePart part = new ExercisePart();
            part.setPercentage(chosen.getPercent());
            part.setSets(chosen.getSets());
            part.setReps(chosen.getReps());

            double basePr = AccessoryPrMapper.getPr(user, name);
            part.setLoadKg(basePr * chosen.getPercent() / 100.0);

            exercise.setExerciseParts(List.of(part));
        }

        return exercise;
    }

    private String getNameForDay(int dayNumber, int exerciseNumber) {
        return switch (dayNumber) {
            case 1  -> ExersciseList.firstDay.get(exerciseNumber - 1);
            case 2  -> ExersciseList.secondDay.get(exerciseNumber - 1);
            default -> ExersciseList.thirdDay.get(exerciseNumber - 1);
        };
    }
}
