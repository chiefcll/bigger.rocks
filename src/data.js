import React from 'react';
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

const AppContext = React.createContext();
let defaultState = {
    workout,
    completedWorkouts,
    workoutTemplates
};

export class Data extends React.Component {
    constructor() {
        super();
        const storedState = store.get('state');
        this.setContext = newState => {
            console.log('Setting State: ', newState);
            this.setState(() => newState);
        };
        this.state = storedState || {
            ...defaultState
        };

        console.log('Default State: ', this.state);
    }

    componentWillUnmount() {
        console.log('Unmount', this.state);
        store.set('state', this.state);
    }

    render() {
        // The entire state is passed to the provider
        console.log('Rendering Data', this.state);
        const value = {
            setContext: this.setContext,
            ...this.state
        };

        return (
            <>
                <AppContext.Provider value={value}>
                    {this.props.children}
                </AppContext.Provider>
            </>
        );
    }
}

export default AppContext;
