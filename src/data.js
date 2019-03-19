import store from 'store';
import defaultState from './defaultData';

const storedState = store.get('state');
const state = storedState || {
    ...defaultState
};

function saveState(state) {
    store.set('state', state);
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

function completeWorkout({ workout, completedWorkouts, workoutTemplates }) {
    if (workoutIsCompleted(workout)) {
        const nextWorkout = getNextWorkout(workoutTemplates, workout);
        nextWorkout.date = 'Next';
        workout.date = new Date().toDateString();

        return {
            workout: nextWorkout,
            completedWorkouts: [workout, ...completedWorkouts]
        };
    }
}

export default {
    state,
    actions: {
        completeWorkout
    },
    saveState
};
