import data from './data';
import defaultData from './defaultData';
import settings from './settings';

function cloneData(data) {
    return JSON.parse(JSON.stringify(data));
}

const { actions } = data;
const dummyState = cloneData(defaultData);

let stateWithCompletedWorkout = cloneData(defaultData);
stateWithCompletedWorkout.workout.exercises.forEach(e => {
    const { reps, sets } = e;
    for (let i = 0; i < sets; i++) {
        e.setsCompleted.push(reps);
    }
});

let stateWithFailedCompletedWorkout = cloneData(stateWithCompletedWorkout);
stateWithFailedCompletedWorkout.workout.exercises[0].setsCompleted[3] = 3;

function getStateAfterCompletedWorkout(state) {
    let nextWorkout = state.workoutTemplates[1];
    nextWorkout.date = 'Next';
    let { workout, workoutTemplates } = state;
    workout.date = new Date().toDateString();

    let completedWorkouts = [workout, ...state.completedWorkouts];

    return {
        workout: nextWorkout,
        completedWorkouts,
        workoutTemplates
    };
}

describe('actions', () => {
    describe('completeWorkout', () => {
        describe('with a workout that is NOT completed', () => {
            it('should return false', () => {
                expect(actions.completeWorkout(dummyState)).toBe(false);
            });
        });

        describe('with a workout that has completed', () => {
            describe('with no failed sets', () => {
                it('should return workout and completedWorkouts', () => {
                    expect(
                        actions.completeWorkout(stateWithCompletedWorkout)
                    ).toEqual(
                        getStateAfterCompletedWorkout(stateWithCompletedWorkout)
                    );
                });

                it('should increment the weight for next workout', () => {
                    let expectedState = getStateAfterCompletedWorkout(
                        stateWithCompletedWorkout
                    );
                    let workoutTemplates = cloneData(
                        expectedState.workoutTemplates
                    );
                    let template = workoutTemplates[0];
                    const { incrementWeightBy } = settings;
                    template.exercises.forEach(e => {
                        e.weight = e.weight + incrementWeightBy;
                    });

                    expect(
                        actions.completeWorkout(stateWithCompletedWorkout)
                    ).toEqual({
                        ...expectedState,
                        workoutTemplates
                    });
                });
            });

            describe('with failed sets', () => {
                it('should NOT increment the weight for failed exercises', () => {
                    let expectedState = getStateAfterCompletedWorkout(
                        stateWithFailedCompletedWorkout
                    );
                    let workoutTemplates = cloneData(
                        expectedState.workoutTemplates
                    );
                    let template = workoutTemplates[0];
                    const { incrementWeightBy } = settings;
                    template.exercises.forEach((e, i) => {
                        if (i > 0) {
                            e.weight = e.weight + incrementWeightBy;
                        }
                    });
                    stateWithFailedCompletedWorkout.workout.exercises[0].setsCompleted[3] = 3;
                    expect(
                        actions.completeWorkout(stateWithFailedCompletedWorkout)
                    ).toEqual({
                        ...expectedState,
                        workoutTemplates
                    });
                });
            });
        });
    });
});
