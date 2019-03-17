import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import AppContext from '../../data';

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

class Home extends Component {
    static contextType = AppContext;

    renderWorkout = workout => {
        const { classes } = this.props;
        return (
            <Grid item xs={12}>
                <Link to="/workout">
                    <Paper className={classes.root}>
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
                                                {`${e.sets}x${e.reps} ${
                                                    e.weight
                                                }${e.unit}`}
                                            </Grid>
                                        </>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Paper>
                </Link>
            </Grid>
        );
    };

    render() {
        const { completedWorkouts } = this.context;

        return (
            <Grid container spacing={16} alignItems={'center'}>
                {completedWorkouts.map(this.renderWorkout)}
            </Grid>
        );
    }
}

export default withStyles(styles)(Home);
