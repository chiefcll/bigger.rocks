export default (state, action) => {
    switch (action.type) {
        case 'WORKOUT_COMPLETED':
            return [
                { ...action.workout, date: new Date().toDateString() },
                ...state.completedWorkouts
            ];
        default:
            return state;
    }
};
