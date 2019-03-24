import store from 'store';
import defaultState from './defaultData';
import settings from './settings';

const storedState = store.get('state');
const state = storedState || {
    ...defaultState
};

function saveState(state) {
    store.set('state', state);
}

function _resetState() {
    store.set('state', { ...defaultState });
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
    incrementWeightBy
}) {
    const currentTemplate =
        workoutTemplates.filter(t => t.id === workout.id)[0] ||
        workoutTemplates[0];

    currentTemplate.exercises.forEach(e => {
        if (exerciseCompletedAllReps(e)) {
            console.log(e.setsCompleted);
            e.weight = e.weight + incrementWeightBy;
        }
    });

    return workoutTemplates;
}

function exerciseCompletedAllReps(exercise) {
    const { reps } = exercise;
    return exercise.setsCompleted.every(set => set === reps);
}

function completeWorkout({ workout, completedWorkouts, workoutTemplates }) {
    if (workoutIsCompleted(workout)) {
        workout.date = new Date().toDateString();

        workoutTemplates = updateWeightForNextWorkout({
            workoutTemplates,
            workout,
            incrementWeightBy: settings.incrementWeightBy
        });

        const nextWorkout = getNextWorkout(workoutTemplates, workout);
        nextWorkout.date = 'Next';

        return {
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
        completeWorkout
    },
    saveState,
    _resetState
};
