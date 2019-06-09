import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Header from '../../components/header';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
        padding: '8px',
        backgroundColor: theme.palette.background.paper,
        fontSize: '1rem'
    },
    inline: {
        display: 'inline'
    }
});

function Home({ completedWorkouts, exerciseWeight, nextWorkout, classes }) {
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
                    <Paper className={classes.root}>
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
        <>
            <Header pageName = 'Workouts' />
            <Grid container spacing={0} alignItems={'center'}>
                {[nextWorkout].map(renderWorkout)}
                {completedWorkouts.map(renderWorkout)}
            </Grid>
        </>
    );
}

export default withStyles(styles)(Home);
