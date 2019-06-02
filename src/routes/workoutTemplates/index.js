import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Button from '@material-ui/core/Button';
import { defaultWorkoutTemplate } from '../../defaultData';

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

function renderTemplate(template, classes) {
    return (
        <Grid item xs={12} key={template.id}>
            <Link to={`/editWorkoutTemplate/${template.id}`}>
                <Paper className={classes.root}>
                    <Grid container xs={12} alignItems={'center'}>
                        <Grid item xs={4}>
                            {template.name}
                        </Grid>
                        <Grid item container xs={8}>
                            {template.exercises.map(e => {
                                return (
                                    <>
                                        <Grid item xs={6}>
                                            {e.name}
                                        </Grid>
                                        <Grid item xs={6}>
                                            {`${e.sets}x${e.reps} ${e.weight}${
                                                e.unit
                                            }`}
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
}

function WorkoutTemplates({ workoutTemplates, updateAppState }) {
    const lastId = workoutTemplates[workoutTemplates.length - 1].id;
    const nextWorkoutId = lastId + 1;

    return (
        <>
            <Header pageName="Exercise Weight">
                <Link to={`/editWorkoutTemplate/${nextWorkoutId}`}>
                    <Button
                        style={{ color: 'white' }}
                        onClick={() => {
                            const newWorkoutTemplate = {
                                ...defaultWorkoutTemplate
                            };
                            newWorkoutTemplate.id = nextWorkoutId;

                            updateAppState({
                                workoutTemplates: [
                                    ...workoutTemplates,
                                    newWorkoutTemplate
                                ]
                            });
                        }}
                    >
                        Add
                    </Button>
                </Link>
            </Header>
            <Grid container spacing={12} alignItems={'center'}>
                {workoutTemplates.map(renderTemplate)}
            </Grid>
        </>
    );
}

export default withStyles(styles)(WorkoutTemplates);
