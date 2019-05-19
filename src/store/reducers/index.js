import completedWorkoutReducer from './completedWorkouts';
import exerciseWeightReducer from './exerciseWeight';
import workoutReducer from './workout';

export default (state, action) => ({
    ...state,
    completedWorkouts: completedWorkoutReducer(state, action),
    exerciseWeight: exerciseWeightReducer(state, action),
    workout: workoutReducer(state, action)
});
