import store from 'store';
import defaultState from './defaultData';
const { storageKey } = defaultState.settings;

const storedState = store.get(storageKey);
const state = storedState || {
    ...defaultState
};

function saveState(state) {
    store.set(storageKey, state);
}

function _resetState() {
    store.set(storageKey, { ...defaultState });
}

function workoutIsCompleted(workout) {
    return workout.exercises.every(e => e.setsCompleted.length === e.sets);
}

function getNextWorkout(templates, workout) {
    const nextId = workout.id + 1;
    const nextTemplate =
        templates.filter(t => t.id === nextId)[0] || templates[0];

    return { ...nextTemplate };
}

function updateWeightForNextWorkout({
    workoutTemplates,
    workout,
    exerciseWeight,
    incrementWeightBy
}) {
    const currentTemplate =
        workoutTemplates.filter(t => t.id === workout.id)[0] ||
        workoutTemplates[0];

    workout.exercises.forEach((e, index) => {
        if (exerciseCompletedAllReps(e)) {
            exerciseWeight[e.name].weight = e.weight + incrementWeightBy;
        }
    });

    currentTemplate.exercises.forEach(e => {
        e.weight = exerciseWeight[e.name].weight;
    });

    return workoutTemplates;
}

function exerciseCompletedAllReps(exercise) {
    const { reps } = exercise;
    return exercise.setsCompleted.every(set => set === reps);
}

function updateExerciseWeight({ workout, workoutTemplates, exerciseWeight }) {
    const updateWeight = exercise => {
        return {
            ...exercise,
            weight: exerciseWeight[exercise.name].weight
        };
    };

    workout.exercises = workout.exercises.map(updateWeight);

    workoutTemplates.forEach(workoutTemplate => {
        workoutTemplate.exercises = workoutTemplate.exercises.map(updateWeight);
    });

    return workout;
}

function completeWorkout({
    workout,
    completedWorkouts,
    workoutTemplates,
    exerciseWeight,
    settings
}) {
    if (workoutIsCompleted(workout)) {
        workout.date = new Date().toDateString();

        workoutTemplates = updateWeightForNextWorkout({
            workoutTemplates,
            exerciseWeight,
            workout,
            incrementWeightBy: settings.incrementWeightBy
        });

        const nextWorkout = getNextWorkout(workoutTemplates, workout);
        nextWorkout.date = 'Next';

        return {
            exerciseWeight,
            workout: nextWorkout,
            completedWorkouts: [workout, ...completedWorkouts],
            workoutTemplates
        };
    }

    return false;
}

export default {
    state,
    actions: {
        completeWorkout,
        updateExerciseWeight
    },
    saveState,
    _resetState
};
