import completedWorkoutReducer from './completedWorkouts';
import exerciseWeightReducer from './exerciseWeight';
import workoutReducer from './workout';
import workoutTemplatesReducer from './workoutTemplates';

export default (state, action) => ({
    ...state,
    completedWorkouts: completedWorkoutReducer(state, action),
    exerciseWeight: exerciseWeightReducer(state, action),
    workout: workoutReducer(state, action),
    workoutTemplates: workoutTemplatesReducer(state, action)
});
