import React, { useState, useEffect } from 'react';
import store from 'store';

const workoutTemplates = [
    {
        id: 1,
        name: 'Workout A',
        exercises: [
            {
                name: 'Squat',
                reps: 5,
                sets: 5,
                weight: 110,
                unit: 'lbs',
                setsCompleted: []
            },
            {
                name: 'Bench',
                reps: 5,
                sets: 5,
                weight: 160,
                unit: 'lbs',
                setsCompleted: []
            },
            {
                name: 'Row',
                reps: 5,
                sets: 5,
                weight: 110,
                unit: 'lbs',
                setsCompleted: []
            }
        ]
    },
    {
        id: 2,
        name: 'Workout B',
        exercises: [
            {
                name: 'Squat',
                reps: 5,
                sets: 5,
                weight: 110,
                unit: 'lbs',
                setsCompleted: []
            },
            {
                name: 'Overhead Press',
                reps: 5,
                sets: 5,
                weight: 160,
                unit: 'lbs',
                setsCompleted: []
            },
            {
                name: 'Deadlifts',
                reps: 5,
                sets: 5,
                weight: 110,
                unit: 'lbs',
                setsCompleted: []
            }
        ]
    }
];

export const workout = {
    id: 1,
    date: 'Sat 2 Mar',
    completed: true,
    exercises: [
        {
            name: 'Squat',
            reps: 5,
            sets: 5,
            weight: 110,
            unit: 'lbs',
            setsCompleted: []
        },
        {
            name: 'Bench',
            reps: 5,
            sets: 5,
            weight: 160,
            unit: 'lbs',
            setsCompleted: []
        },
        {
            name: 'Row',
            reps: 5,
            sets: 5,
            weight: 110,
            unit: 'lbs',
            setsCompleted: []
        }
    ]
};

const completedWorkouts = [workout];

//const AppContext = React.createContext();
let defaultState = {
    workout,
    completedWorkouts,
    workoutTemplates
};

export default function useData() {
    const [state, setState] = useState(() => {
        const storedState = store.get('state');
        return (
            storedState || {
                ...defaultState
            }
        );
    });

    useEffect(() => {
        return () => store.set('state', state);
    });

    return {
        state,
        setState
    };
}
