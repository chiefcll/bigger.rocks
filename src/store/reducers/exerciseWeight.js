function exerciseCompletedAllReps(exercise) {
    const { reps } = exercise;
    return exercise.setsCompleted.every(set => set === reps);
}

function updateExerciseWeight({ exerciseWeight, settings }, workout) {
    const { incrementWeightBy } = settings;
    let updatedExerciseWeight = {
        ...exerciseWeight
    };

    workout.exercises.forEach((e, index) => {
        if (exerciseCompletedAllReps(e)) {
            updatedExerciseWeight[e.name].weight = e.weight + incrementWeightBy;
        }
    });

    return updatedExerciseWeight;
}

export default (state, action) => {
    switch (action.type) {
        case 'WORKOUT_COMPLETED':
            return updateExerciseWeight(state, action.workout);
        default:
            return state;
    }
};
