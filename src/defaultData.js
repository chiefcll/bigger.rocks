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

const workout = {
    id: 1,
    date: 'Next',
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
};

let completedWorkout = {
    date: 'Sat Mar 23 2019',
    ...workoutTemplates[1]
};

completedWorkout.exercises.forEach(e => {
    const { reps, sets } = e;
    for (let i = 0; i < sets; i++) {
        e.setsCompleted.push(reps);
    }
});

const completedWorkouts = [completedWorkout];

export default {
    workout,
    completedWorkouts,
    workoutTemplates
};
