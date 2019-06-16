import { useStateValue } from '../stateProvider';

export default function ExerciseWeight({ exercise }) {
    const [state] = useStateValue();
    const { exerciseWeight } = state;
    const e = exercise.weight ? exercise : exerciseWeight[exercise.name];
    return `${exercise.sets}x${exercise.reps} ${e.weight}${e.unit}`;
}
