import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Timer from '../../components/timer';
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

class Workout extends Component {
    constructor(props) {
        super(props);
        this.state = { showTimer: false, ...props };
    }

    completeSet = (exercise, index) => {
        this.setState(({ workout }) => {
            let repsCompleted = exercise.setsCompleted[index];

            if (repsCompleted) {
                repsCompleted -= 1;
            } else {
                repsCompleted = exercise.reps;
            }
            exercise.setsCompleted[index] = repsCompleted;

            return {
                lastCompletedIndex: index,
                showTimer: true,
                workout: {
                    ...workout
                }
            };
        });
    };

    workoutIsComplete(workout) {
        return workout.exercises.every(e => e.setsCompleted.length === e.sets);
    }

    setRepsCompleted = () => {
        this.setState(({ workout }) => {
            workout.exercises.forEach(e => {
                const { sets, reps } = e;
                for (let i = 0; i < sets; i++) {
                    e.setsCompleted.push(reps);
                }
            });

            return {
                showTimer: false,
                workout: {
                    ...workout
                }
            };
        });
    };

    render() {
        const { classes, actions, dispatch, exerciseWeight } = this.props;
        const { workout, showTimer, lastCompletedIndex } = this.state;

        return (
            <>
                <Header pageName="Workout">
                    <Link to="/">
                        <Button
                            style={{ color: 'white' }}
                            onClick={() => {
                                if (this.workoutIsComplete(workout)) {
                                    dispatch(actions.workout.complete(workout));
                                }
                            }}
                        >
                            Done
                        </Button>
                    </Link>
                </Header>
                <Grid container spacing={0} alignItems="center">
                    {workout.exercises.map(exercise => {
                        const { name, sets, reps } = exercise;
                        const { weight, unit } = exerciseWeight[exercise.name];
                        const barWeight = 45;
                        const weightPerSide = (weight - barWeight) / 2;
                        return (
                            <Grid key={name} item xs={12}>
                                <Paper className={classes.root}>
                                    <Grid container alignItems="center">
                                        <Grid
                                            item
                                            xs={3}
                                            className={`${
                                                classes.exerciseName
                                            } ${classes.exerciseHeader}`}
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
                                            {`${sets}x${reps} ${weight}${unit} - ${weightPerSide}${unit}`}
                                        </Grid>
                                        <Grid
                                            container
                                            justify="space-between"
                                            className={classes.fabs}
                                        >
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
                                                            fontSize: '1.4rem'
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
                <Button onClick={this.setRepsCompleted}>
                    Set Reps Completed
                </Button>
            </>
        );
    }
}

export default withStyles(styles)(Workout);
