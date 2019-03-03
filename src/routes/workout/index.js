import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Timer from '../../components/timer';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    margin: theme.spacing.unit * 2,
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
  }
});

const times = n => f => {
    const loopFor = new Array(n).fill(0);
    return loopFor.map(f);
}

const workout =
    {
        date: 'Sat 2 Mar',
        exercises: [
            {
                name: 'Squat',
                reps: 5,
                sets: 5,
                weight: 110,
                unit: 'lbs',
                setsCompleted: []
            },
            {
                name: 'Bench',
                reps: 5,
                sets: 5,
                weight: 160,
                unit: 'lbs',
                setsCompleted: []
            },
            {
                name: 'Row',
                reps: 5,
                sets: 5,
                weight: 110,
                unit: 'lbs',
                setsCompleted: []
            }
        ]
    };

class Workout extends Component {

    constructor() {
        super();
        this.state = {
            workout
        };
    }

    audio = React.createRef();

    onExpire() {
        this.audio.play();
    }

    completeSet = (exercise, index) => {
        this.setState((prevState, props) => {
            let {workout} = prevState;
            let repsCompleted = exercise.setsCompleted[index];

            if (repsCompleted) {
                repsCompleted--;
            } else {
                repsCompleted = exercise.reps;
            }
            exercise.setsCompleted[index] = repsCompleted;

            return {
                workout: {
                    ...workout
                }
            };
        });
    }

    render() {
        const { classes } = this.props;
        const { workout } = this.state;
        var t = new Date();
        t.setSeconds(t.getSeconds() + 90); // 10 minutes timer
        const timeBeforeNextSet = t;
        return (
            <Grid container spacing={16} alignItems={'center'}>
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
                                    <span>{exercise.setsCompleted[index]}</span>
                                </Fab>
                            )}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                )})
            }
            <div>
                Great job - time to next set: 
                <Timer className={classes.timer} expiryTimestamp={timeBeforeNextSet} onExpire={this.onExpire} />
                <audio ref={this.audio} src="/media/examples/t-rex-roar.mp3" preload="auto" />
            </div>
            
            </Grid>
        );
    }
}

export default withStyles(styles)(Workout);
  