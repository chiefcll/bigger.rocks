export const getWeightAndUnit = exercise => {
    return printWeightAndUnit(
        exercise.weight ? exercise : exerciseWeight[exercise.name]
    );
};

const printWeightAndUnit = exercise => {
    return `${exercise.weight}${exercise.unit}`;
};
