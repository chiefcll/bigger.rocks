function getNextWorkout(workoutTemplates, workout) {
    const currentTemplate =
        workoutTemplates.filter(t => t.id === workout.id)[0] ||
        workoutTemplates[0];
    const currentTemplateIndex = workoutTemplates.indexOf(currentTemplate);
    const nextTemplate =
        workoutTemplates[currentTemplateIndex + 1] || workoutTemplates[0];

    return { ...nextTemplate };
}

function completeWorkout({ workoutTemplates }, workout) {
    const nextWorkout = getNextWorkout(workoutTemplates, workout);
    nextWorkout.date = 'Next';

    return nextWorkout;
}

export default (state, action) => {
    switch (action.type) {
        case 'WORKOUT_COMPLETED':
            return completeWorkout(state, action.workout);
        default:
            return state;
    }
};
