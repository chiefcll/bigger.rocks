import React, { Component } from 'react';
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


class ExerciseWeight extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
        this.changeWeight = this.changeWeight.bind(this);
    }

    changeWeight(exerciseName, incrementOrDecrement) {
        this.setState(({exerciseWeight, settings}) => {
            let exercise = {
                ...exerciseWeight[exerciseName]
            };

            if (incrementOrDecrement === 'increment') {
                exercise.weight += settings.incrementWeightBy;
            } else {
                exercise.weight -= settings.incrementWeightBy;
            }
            exerciseWeight[exerciseName] = exercise;
            return exerciseWeight;
        })
    }

    render() {
        const { classes } = this.props;
        const { exerciseWeight, settings } = this.state;
        const { incrementWeightBy } = settings;

        return (
            <>
                <Header pageName="Exercise Weight">
                    <Link to="/">
                        <Button
                            style={{ color: 'white' }}
                            onClick={() => {}}
                        >
                            Done
                        </Button>
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
                                            className={`${
                                                classes.exerciseName
                                            } ${classes.exerciseHeader}`}
                                        >
                                            {exerciseName} - {weight}{unit}
                                        </Grid>
                                        <Grid container justify="space-between">
                                            <Fab
                                                onClick={() =>
                                                    this.changeWeight(exerciseName, 'decrement')
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
                                                    this.changeWeight(exerciseName, 'increment')
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
}

export default withStyles(styles)(ExerciseWeight);
