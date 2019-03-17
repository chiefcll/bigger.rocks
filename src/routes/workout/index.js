import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AppContext from '../../data';
import Header from '../../components/header';
import Timer from '../../components/timer';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        margin: theme.spacing.unit,
        padding: '8px',
        backgroundColor: theme.palette.background.paper
    },
    exerciseHeader: {
        paddingTop: '5px',
        paddingBottom: '5px'
    },
    exerciseName: {
        textAlign: 'left'
    },
    exerciseProps: {
        textAlign: 'right'
    },
    inline: {
        display: 'inline'
    },
    timer: {
        display: 'inline'
    },
    timerContainer: {
        position: 'absolute',
        bottom: theme.spacing.unit,
        right: 0,
        left: theme.spacing.unit,
        fontSize: '1.5rem',
        textAlign: 'left'
    }
});

const times = n => f => {
    const loopFor = new Array(n).fill(0);
    return loopFor.map(f);
};

function workoutIsCompleted(workout) {
    return workout.exercises.every(e => e.setsCompleted.length === e.sets);
}

function getNextWorkout(templates, workout) {
    const nextId = workout.id + 1;
    const nextTemplate =
        templates.filter(t => t.id === nextId)[0] || templates[0];

    return { ...nextTemplate };
}

class Workout extends Component {
    static contextType = AppContext;

    state = {
        showTimer: false
    };

    completeSet = (exercise, index) => {
        const { workout, setContext } = this.context;
        let repsCompleted = exercise.setsCompleted[index];

        if (repsCompleted) {
            repsCompleted -= 1;
        } else {
            repsCompleted = exercise.reps;
        }
        exercise.setsCompleted[index] = repsCompleted;

        setContext({
            workout: {
                ...workout
            }
        });

        this.setState(() => {
            return {
                lastCompletedIndex: index,
                showTimer: true
            };
        });
    };

    completeWorkout = () => {
        const {
            workout,
            completedWorkouts,
            workoutTemplates,
            setContext
        } = this.context;

        if (workoutIsCompleted(workout)) {
            const nextWorkout = getNextWorkout(workoutTemplates, workout);
            nextWorkout.date = 'Next';

            setContext({
                workout: nextWorkout,
                completedWorkouts: [workout, ...completedWorkouts]
            });
        }
    };

    render() {
        const { classes } = this.props;
        const { showTimer, lastCompletedIndex } = this.state;
        const { workout } = this.context;

        return (
            <>
                <Header pageName="Workout">
                    <Link to="/">
                        <Button
                            style={{ color: 'white' }}
                            onClick={this.completeWorkout}
                        >
                            Done
                        </Button>
                    </Link>
                </Header>
                <Grid container spacing={0} alignItems="center">
                    {workout.exercises.map(exercise => {
                        const { name, sets, reps, weight, unit } = exercise;
                        return (
                            <Grid key={name} item xs={12}>
                                <Paper className={classes.root}>
                                    <Grid container alignItems="center">
                                        <Grid
                                            item
                                            xs={6}
                                            className={`${
                                                classes.exerciseName
                                            } ${classes.exerciseHeader}`}
                                        >
                                            {name}
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.exerciseProps}
                                        >
                                            {`${sets}x${reps} ${weight}${unit}`}
                                        </Grid>
                                        <Grid container justify="space-between">
                                            {times(sets)((key, index) => (
                                                <Fab
                                                    key={index}
                                                    onClick={() =>
                                                        this.completeSet(
                                                            exercise,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: '1.5rem'
                                                        }}
                                                    >
                                                        {
                                                            exercise
                                                                .setsCompleted[
                                                                index
                                                            ]
                                                        }
                                                    </span>
                                                </Fab>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        );
                    })}

                    {showTimer && (
                        <div className={classes.timerContainer}>
                            Great job - time to next set:{' '}
                            <Timer
                                className={classes.timer}
                                beepAt={90}
                                key={lastCompletedIndex}
                            />
                        </div>
                    )}
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(Workout);
