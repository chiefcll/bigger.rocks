import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import { useStateValue } from '../../components/stateProvider';
import ExerciseWeight from '../../components/exerciseWeight';
import clsx from 'clsx';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        padding: '8px',
        backgroundColor: theme.palette.background.paper,
        fontSize: '1rem'
    },
    exerciseHeader: {
        paddingTop: '1px',
        paddingBottom: '5px',
        fontSize: '1.2rem'
    },
    exerciseName: {
        textAlign: 'left',
        paddingLeft: '8px'
    },
    exerciseProps: {
        textAlign: 'right',
        paddingRight: '8px'
    },
    fabs: {},
    inline: {
        display: 'inline'
    },
    timer: {
        display: 'inline'
    },
    timerContainer: {
        position: 'absolute',
        bottom: theme.spacing(1),
        right: 0,
        left: theme.spacing(1),
        fontSize: '1.5rem',
        textAlign: 'left'
    }
});

const times = n => f => {
    const loopFor = new Array(n).fill(0);
    return loopFor.map(f);
};

function CompletedWorkout({ classes, match }) {
    const [state, dispatch] = useStateValue();
    const { completedWorkouts } = state;
    const id = parseInt(match.params.id);
    const workout = completedWorkouts[id];

    return (
        <>
            <Header pageName={`Completed Workout | ${workout.date}`}>
                <Link to="/">
                    <Button style={{ color: 'white' }}>Done</Button>
                </Link>
            </Header>
            <Grid container spacing={0} alignItems="center">
                {workout.exercises.map(exercise => {
                    const { name, sets, reps } = exercise;
                    return (
                        <Grid key={name} item xs={12}>
                            <Paper className={classes.root}>
                                <Grid container alignItems="center">
                                    <Grid
                                        item
                                        xs={3}
                                        className={`${classes.exerciseName} ${
                                            classes.exerciseHeader
                                        }`}
                                    >
                                        {name}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={9}
                                        className={clsx(
                                            classes.exerciseProps,
                                            classes.exerciseHeader
                                        )}
                                    >
                                        <ExerciseWeight exercise={exercise} />
                                    </Grid>
                                    <Grid
                                        container
                                        justify="space-between"
                                        className={classes.fabs}
                                    >
                                        {times(sets)((key, index) => (
                                            <Fab key={index} disabled>
                                                <span
                                                    style={{
                                                        fontSize: '1.4rem'
                                                    }}
                                                >
                                                    {
                                                        exercise.setsCompleted[
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
            </Grid>
        </>
    );
}

export default withStyles(styles)(CompletedWorkout);
