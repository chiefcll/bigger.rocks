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

class Home extends Component {
    renderWorkout = workout => {
        const { classes } = this.props;
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
                                                {`${e.sets}x${e.reps} ${
                                                    e.weight
                                                }${e.unit}`}
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

    render() {
        const { completedWorkouts, nextWorkout } = this.props;

        return (
            <Grid container spacing={16} alignItems={'center'}>
                {[nextWorkout].map(this.renderWorkout)}
                {completedWorkouts.map(this.renderWorkout)}
            </Grid>
        );
    }
}

export default withStyles(styles)(Home);
