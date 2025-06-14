package com.powercycles.ai_workout_planner.template.linear8weeks_hypertrophy;

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
public class LinearHypertrophyMesocycleGenerator {

    final Random rand = new Random(System.currentTimeMillis());

    public List<TrainingWeek> generateLinearHypertrophyMesocycle(User user) {
        List<TrainingWeek> generatedMesocycle = new ArrayList<>();
        final double[] PERC = {55, 57.5, 60, 62.5, 65, 67.5, 70, 72.5};

        for (int week = 1; week <= 8; week++) {
            generatedMesocycle.add(generateWeek(user, week, PERC[week - 1]));
        }

        user.setBenchPr(user.getBenchPr() * 1.02);
        user.setSquatPr(user.getSquatPr() * 1.02);
        user.setDeadliftPr(user.getDeadliftPr() * 1.02);

        return generatedMesocycle;
    }

    private TrainingWeek generateWeek(User user, int weekNumber, double mainExercisesPercent) {
        TrainingWeek trainingWeek = new TrainingWeek();
        trainingWeek.setWeekNumber(weekNumber);

        for (int day = 1; day <= 3; day++) {
            trainingWeek.getWeekStructure().add(generateDay(user, weekNumber, day, mainExercisesPercent));
        }

        return trainingWeek;
    }

    private TrainingDay generateDay(User user, int weekNumber, int dayNumber, double mainExercisesPercent) {
        TrainingDay trainingDay = new TrainingDay();
        trainingDay.setDayNumber(dayNumber);

        for (int ex = 1; ex <= 5; ex++) {
            trainingDay.getDayStructure().add(generateExercise(user, weekNumber, dayNumber, ex, mainExercisesPercent));
        }

        return trainingDay;
    }

    private Exercise generateExercise(User user, int weekNumber, int dayNumber, int exerciseNumber, double mainExercisesPercent) {
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

            int reps = (weekNumber <= 4 ? 12 : 10);

            ExercisePart part = new ExercisePart();
            part.setPercentage(mainExercisesPercent);
            part.setSets(4);
            part.setReps(reps);
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
