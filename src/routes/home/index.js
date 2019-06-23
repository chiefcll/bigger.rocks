import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import ExerciseWeight from '../../components/exerciseWeight';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        padding: '8px',
        backgroundColor: theme.palette.background.paper,
        fontSize: '1rem'
    },
    inline: {
        display: 'inline'
    }
});

function Home({ completedWorkouts, nextWorkout, classes }) {
    const renderWorkout = (workout, index, isCompleted = true) => {
        const linkTo = isCompleted ? `/completedWorkout/${index}` : '/workout';
        return (
            <Grid item xs={12} key={workout.date}>
                <Link to={linkTo}>
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
                                                <ExerciseWeight exercise={e} />
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
            <Header pageName="Workouts" />
            <Grid container spacing={0} alignItems={'center'}>
                {renderWorkout(nextWorkout, undefined, false)}
                {completedWorkouts.map(renderWorkout)}
            </Grid>
        </>
    );
}

export default withStyles(styles)(Home);
