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

function changeWeight(
    { exerciseWeight, settings },
    exerciseName,
    incrementOrDecrement
) {
    let weight = exerciseWeight[exerciseName].weight;
    if (incrementOrDecrement === 'INCREMENT') {
        weight += settings.incrementWeightBy;
    } else {
        weight -= settings.incrementWeightBy;
    }

    let value = {
        ...exerciseWeight
    };
    value[exerciseName] = {
        ...exerciseWeight[exerciseName],
        weight
    };
    return value;
}

export default (state, action) => {
    switch (action.type) {
        case 'WORKOUT_COMPLETED':
            return updateExerciseWeight(state, action.workout);
        case 'DECREMENT_WEIGHT':
            return changeWeight(state, action.exerciseName, 'DECREMENT');
        case 'INCREMENT_WEIGHT':
            return changeWeight(state, action.exerciseName, 'INCREMENT');
        default:
            return state.exerciseWeight;
    }
};
