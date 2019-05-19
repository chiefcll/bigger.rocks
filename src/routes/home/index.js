import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        margin: theme.spacing.unit * 2,
        backgroundColor: theme.palette.background.paper
    },
    inline: {
        display: 'inline'
    }
});

function Home({ completedWorkouts, exerciseWeight, nextWorkout }) {
    const getWeightAndUnit = exercise => {
        return printWeightAndUnit(
            exercise.weight ? exercise : exerciseWeight[exercise.name]
        );
    };

    const printWeightAndUnit = exercise => {
        return `${exercise.weight}${exercise.unit}`;
    };

    const renderWorkout = workout => {
        return (
            <Grid item xs={12} key={workout.date}>
                <Link to="/workout">
                    <Paper>
                        <Grid container alignItems={'center'}>
                            <Grid item xs={4}>
                                {workout.date}
                            </Grid>
                            <Grid item container xs={8}>
                                {workout.exercises.map(e => {
                                    return (
                                        <React.Fragment key={e.name}>
                                            <Grid item xs={6}>
                                                {e.name}
                                            </Grid>
                                            <Grid item xs={6}>
                                                {`${e.sets}x${e.reps} 
                                                ${getWeightAndUnit(e)}`}
                                            </Grid>
                                        </React.Fragment>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Paper>
                </Link>
            </Grid>
        );
    };

    return (
        <Grid container spacing={16} alignItems={'center'}>
            {[nextWorkout].map(renderWorkout)}
            {completedWorkouts.map(renderWorkout)}
        </Grid>
    );
}

export default withStyles(styles)(Home);
