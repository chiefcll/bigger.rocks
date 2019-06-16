function updateWorkoutTemplate(wt, template) {
    const workoutTemplates = wt.filter(wt => wt.id !== template.id);
    return [...workoutTemplates, template];
}

export default (state, action) => {
    switch (action.type) {
        case 'ADD_WORKOUT_TEMPLATE':
            return [...state.workoutTemplates, action.payload.workoutTemplate];
        case 'UPDATE_WORKOUT_TEMPLATE':
            return updateWorkoutTemplate(
                state.workoutTemplates,
                action.payload.workoutTemplate
            );
        default:
            return state.workout;
    }
};
