import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    margin: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

const workouts = [
    {
        date: 'Sat 2 Mar',
        exercises: [
            {
                name: 'Squat',
                reps: 5,
                sets: 5,
                weight: 110,
                unit: 'lbs'
            },
            {
                name: 'Bench',
                reps: 5,
                sets: 5,
                weight: 160,
                unit: 'lbs'
            },
            {
                name: 'Row',
                reps: 5,
                sets: 5,
                weight: 110,
                unit: 'lbs'
            }
        ]
    }
];

class Home extends Component {

    constructor() {
        super();
        this.state = {
            workouts
        };
    }

    renderWorkout = (workout) => {
        const { classes } = this.props;
        return (
            <Grid item xs={12}>
            <Link to='/workout'>
                <Paper className={classes.root} >
                    <Grid container xs={12} alignItems={'center'}>
                        <Grid item xs={4}>
                            {workout.date}
                        </Grid>
                        <Grid item container xs={8}>
                        {workout.exercises.map(e => {
                            return (
                                <>
                                <Grid item xs={6}>
                                    {e.name}
                                </Grid>
                                <Grid item xs={6}>
                                    {`${e.sets}x${e.reps} ${e.weight}${e.unit}`}
                                </Grid>
                                </>
                            );
                        })}
                        </Grid>
                </Grid>
                </Paper>
            </Link>
            </Grid>
        )
    };

    render() {
        const { classes } = this.props;
        const { workouts } = this.state;

        return (
            <Grid container spacing={12} alignItems={'center'}>
            {workouts.map(this.renderWorkout)}
            </Grid>
        );
    }
}

export default withStyles(styles)(Home);
  