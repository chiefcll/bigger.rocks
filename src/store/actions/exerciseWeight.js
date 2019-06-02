export const increment = exerciseName => {
    return { type: 'INCREMENT_WEIGHT', exerciseName };
};

export const decrement = exerciseName => {
    return { type: 'DECREMENT_WEIGHT', exerciseName };
};
