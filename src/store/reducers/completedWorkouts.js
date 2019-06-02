function addWeight({ exerciseWeight }, workout) {
    const exercises = workout.exercises.map(exercise => ({
        ...exercise,
        ...exerciseWeight[exercise.name]
    }));

    return { ...workout, exercises };
}

export default (state, action) => {
    switch (action.type) {
        case 'WORKOUT_COMPLETED':
            return [
                {
                    ...addWeight(state, action.workout),
                    date: new Date().toDateString()
                },
                ...state.completedWorkouts
            ];
        default:
            return state.completedWorkouts;
    }
};
