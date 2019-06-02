import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Header from '../../components/header';

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
    }
});

function ExerciseWeight({ classes, exerciseWeight, dispatch, actions }) {
    return (
        <>
            <Header pageName="Exercise Weight">
                <Link to="/">
                    <Button style={{ color: 'white' }}>Done</Button>
                </Link>
            </Header>
            <Grid container spacing={0} alignItems="center">
                {Object.keys(exerciseWeight).map(exerciseName => {
                    const exercise = exerciseWeight[exerciseName];
                    const { weight, unit } = exercise;

                    return (
                        <Grid key={exerciseName} item xs={12}>
                            <Paper className={classes.root}>
                                <Grid container alignItems="center">
                                    <Grid
                                        item
                                        xs={6}
                                        className={`${classes.exerciseName} ${
                                            classes.exerciseHeader
                                        }`}
                                    >
                                        {exerciseName} - {weight}
                                        {unit}
                                    </Grid>
                                    <Grid container justify="space-between">
                                        <Fab
                                            onClick={() =>
                                                dispatch(
                                                    actions.exerciseWeight.decrement(
                                                        exerciseName
                                                    )
                                                )
                                            }
                                        >
                                            <span
                                                style={{
                                                    fontSize: '1.5rem'
                                                }}
                                            >
                                                -
                                            </span>
                                        </Fab>

                                        <Fab
                                            onClick={() =>
                                                dispatch(
                                                    actions.exerciseWeight.increment(
                                                        exerciseName
                                                    )
                                                )
                                            }
                                        >
                                            <span
                                                style={{
                                                    fontSize: '1.5rem'
                                                }}
                                            >
                                                +
                                            </span>
                                        </Fab>
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

export default withStyles(styles)(ExerciseWeight);
