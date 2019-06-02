function addWeight({ exerciseWeight }, workout) {
    const exercises = workout.exercises.map(exercise => ({
        ...exercise,
        ...exerciseWeight[exercise.name]
    }));

    return { ...workout, exercises };
}

const dateOptions = { weekday: 'short', month: 'short', day: '2-digit' };

export default (state, action) => {
    switch (action.type) {
        case 'WORKOUT_COMPLETED':
            return [
                {
                    ...addWeight(state, action.workout),
                    date: new Date().toLocaleDateString('en-US', dateOptions)
                },
                ...state.completedWorkouts
            ];
        default:
            return state.completedWorkouts;
    }
};
