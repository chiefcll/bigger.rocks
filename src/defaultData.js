const workoutTemplates = [
    {
        id: 1,
        name: 'Workout A',
        exercises: [
            {
                name: 'Squat',
                reps: 5,
                sets: 5,
                setsCompleted: []
            },
            {
                name: 'Bench',
                reps: 5,
                sets: 5,
                setsCompleted: []
            },
            {
                name: 'Row',
                reps: 5,
                sets: 5,
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
                setsCompleted: []
            },
            {
                name: 'Overhead Press',
                reps: 5,
                sets: 5,
                setsCompleted: []
            },
            {
                name: 'Deadlifts',
                reps: 5,
                sets: 5,
                setsCompleted: []
            }
        ]
    }
];

const workout = {
    id: 1,
    date: 'Next',
    name: 'Workout A',
    exercises: [
        {
            name: 'Squat',
            reps: 5,
            sets: 5,
            setsCompleted: []
        },
        {
            name: 'Bench',
            reps: 5,
            sets: 5,
            setsCompleted: []
        },
        {
            name: 'Row',
            reps: 5,
            sets: 5,
            setsCompleted: []
        }
    ]
};

const exerciseWeight = {
    Squat: {
        weight: 110,
        unit: 'lbs'
    },
    Row: {
        weight: 110,
        unit: 'lbs'
    },
    Bench: {
        weight: 160,
        unit: 'lbs'
    },
    'Overhead Press': {
        weight: 100,
        unit: 'lbs'
    },
    Deadlifts: {
        weight: 220,
        unit: 'lbs'
    }
};

let completedWorkout = {
    date: 'Sat, Mar 23',
    ...workoutTemplates[1]
};

completedWorkout.exercises.forEach(e => {
    const { reps, sets } = e;
    e.weight = exerciseWeight[e.name].weight;
    e.unit = exerciseWeight[e.name].unit;
    for (let i = 0; i < sets; i++) {
        e.setsCompleted.push(reps);
    }
});

const completedWorkouts = [completedWorkout];

const settings = {
    incrementWeightBy: 5,
    barWeight: '45',
    units: 'lbs',
    storageKey: 'workoutApp'
};

export default {
    workout,
    completedWorkouts,
    workoutTemplates,
    exerciseWeight,
    settings
};

export const defaultWorkoutTemplate = {
    name: 'Workout Name',
    exercises: [
        {
            name: 'Squat',
            reps: 5,
            sets: 5,
            weight: 110,
            unit: 'lbs'
        }
    ]
};
