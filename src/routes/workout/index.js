import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Timer from '../../components/timer';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import AppContext from '../../data';
import Button from '@material-ui/core/Button';
import Header from '../../components/header';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    margin: theme.spacing.unit,
    padding: '8px',
    backgroundColor: theme.palette.background.paper,
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
    display: 'inline',
  },
  timer: {
    display: 'inline',
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
}

function workoutIsCompleted(workout) {
    return workout.exercises.every(e => e.setsCompleted.length === e.sets);
}

function getNextWorkout(templates, workout) {
    let nextId = workout.id++;
    let nextTemplate = templates.filter(t => t.id === nextId)[0] || templates[0];
    
    return {...nextTemplate};
}

class Workout extends Component {
    static contextType = AppContext;
    state = {
        showTimer: false
    };

    completeSet = (exercise, index) => {
        let {workout} = this.context;
        let repsCompleted = exercise.setsCompleted[index];

        if (repsCompleted) {
            repsCompleted--;
        } else {
            repsCompleted = exercise.reps;
        }
        exercise.setsCompleted[index] = repsCompleted;

        this.context.setContext({
            workout: {
                ...workout
            }
        });

        this.setState(() => {
            return {
                lastCompletedIndex: index,
                showTimer: true
            }
        });
    }

    completeWorkout = () => {
        let {workout, completedWorkouts, workoutTemplates} = this.context;
        
        if (workoutIsCompleted(workout)) {
            let nextWorkout = getNextWorkout(workoutTemplates, workout);
            nextWorkout.date = 'Next';

            this.context.setContext({
                workout: nextWorkout,
                completedWorkouts: [workout, ...completedWorkouts],
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { showTimer, lastCompletedIndex } = this.state;
        const { workout } = this.context;

        return (
            <>
                <Header pageName={'Workout'}>
                    <Link to="/">
                        <Button style={{color: 'white'}} onClick={this.completeWorkout}>Done</Button>
                    </Link>
                </Header>
                <Grid container spacing={0} alignItems={'center'}>
                {workout.exercises.map((exercise, exerciseIndex) => {
                    const {name, sets, reps, weight, unit} = exercise;
                    return (
                    <Grid key={exerciseIndex} item xs={12}>
                        <Paper className={classes.root}>
                            <Grid container alignItems={'center'}>
                                <Grid item xs={6} className={`${classes.exerciseName} ${classes.exerciseHeader}`}>
                                    {name}
                                </Grid>
                                <Grid item xs={6} className={classes.exerciseProps}>
                                    {`${sets}x${reps} ${weight}${unit}`}
                                </Grid>
                                <Grid container justify={'space-between'}>
                                {times(sets)( (key, index) =>
                                    <Fab key={index} onClick={event => this.completeSet(exercise, index)}>
                                        <span style={{fontSize: '1.5rem'}}>{exercise.setsCompleted[index]}</span>
                                    </Fab>
                                )}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )})
            }

            {showTimer &&
                <div className={classes.timerContainer}>
                    Great job - time to next set: {' '}
                    <Timer className={classes.timer} beepAt={90} key={lastCompletedIndex} />
                </div>
            }

            </Grid>
            </>
        );
    }
}

export default withStyles(styles)(Workout);
