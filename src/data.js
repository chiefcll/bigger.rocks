import React from 'react';
import SimpleStorage, {resetParentState} from 'react-simple-storage';

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
]

export const workout =
    {
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

const completedWorkouts = [
    workout
]
    
const AppContext = React.createContext();
let defaultState = {
    workout,
    completedWorkouts,
    workoutTemplates
}

export class Data extends React.Component {
    state = {
        ...defaultState
        //resetState: true,
    };

    setContext = this.setState.bind(this)

    render() {
        // The entire state is passed to the provider
        const value = {
            setContext: this.setContext,
            ...this.state
        }

        if (this.state.resetState) {
            resetParentState(this, { ...defaultState, resetState: false});
        }

        return (
            <>
                <SimpleStorage
                    parent={this}
                />
                <AppContext.Provider value={value}>
                    {this.props.children}
                </AppContext.Provider>
            </>
        );
    }
}

export default AppContext;