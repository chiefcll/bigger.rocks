import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Button from '@material-ui/core/Button';
import { defaultWorkoutTemplate } from '../../defaultData';
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

function WorkoutTemplates({ workoutTemplates, dispatch, classes }) {
    const lastId = workoutTemplates[workoutTemplates.length - 1].id;
    const nextWorkoutId = lastId + 1;

    function addWorkoutTemplate() {
        const workoutTemplate = {
            ...defaultWorkoutTemplate
        };
        workoutTemplate.id = nextWorkoutId;
        dispatch({
            type: 'ADD_WORKOUT_TEMPLATE',
            payload: {
                workoutTemplate
            }
        });
    }

    return (
        <>
            <Header pageName="Exercise Templates">
                <Link to={`/settings`}>
                    <Button style={{ color: 'white' }}>Done</Button>
                </Link>
            </Header>
            <Grid container spacing={0} alignItems={'center'}>
                {workoutTemplates.map(template => (
                    <Grid item xs={12} key={template.id}>
                        <Link to={`/editWorkoutTemplate/${template.id}`}>
                            <Paper className={classes.root}>
                                <Grid container alignItems={'center'}>
                                    <Grid item xs={4}>
                                        {template.name}
                                    </Grid>
                                    <Grid item container xs={8}>
                                        {template.exercises.map(e => {
                                            return (
                                                <React.Fragment key={e.name}>
                                                    <Grid item xs={6}>
                                                        {e.name}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <ExerciseWeight
                                                            exercise={e}
                                                        />
                                                    </Grid>
                                                </React.Fragment>
                                            );
                                        })}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Link>
                    </Grid>
                ))}
                <div style={{}}>
                    <Link to={`/editWorkoutTemplate/${nextWorkoutId}`}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => addWorkoutTemplate()}
                        >
                            Add Workout Template
                        </Button>
                    </Link>
                </div>
            </Grid>
        </>
    );
}

export default withStyles(styles)(WorkoutTemplates);
