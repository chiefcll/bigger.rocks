import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Header from '../../components/header';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../components/stateProvider';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        margin: theme.spacing(2),
        backgroundColor: theme.palette.background.paper
    },
    inline: {
        display: 'inline'
    }
});

function handleChange({ set, template, key, event, index }) {
    if (index === undefined) {
        template[key] = event.target.value;
    } else {
        template.exercises[index][key] = event.target.value;
    }
    set({
        ...template
    });
}

function getWorkoutTemplate(workoutTemplates, id) {
    return {
        ...workoutTemplates.filter(wt => wt.id === id)[0]
    };
}

function EditWorkoutTemplate({ classes, match }) {
    const id = parseInt(match.params.id);
    const [state, dispatch] = useStateValue();
    const { workoutTemplates } = state;
    const [template, setTemplate] = useState(
        getWorkoutTemplate(workoutTemplates, id)
    );
    return (
        <>
            <Header pageName="Edit Workout Template">
                <Link to="/workoutTemplates">
                    <Button
                        style={{ color: 'white' }}
                        onClick={() => {
                            dispatch({
                                type: 'UPDATE_WORKOUT_TEMPLATE',
                                payload: {
                                    workoutTemplate: template
                                }
                            });
                        }}
                    >
                        Done
                    </Button>
                </Link>
            </Header>
            <Grid container spacing={0} alignItems={'center'}>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <form>
                            <TextField
                                label="Template Name"
                                value={template.name}
                                onChange={event =>
                                    handleChange({
                                        event,
                                        set: setTemplate,
                                        template,
                                        key: 'name'
                                    })
                                }
                                className={classes.textField}
                                margin="normal"
                                variant="filled"
                            />

                            <h3>
                                Exercises{' '}
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ color: 'white' }}
                                    onClick={() => {
                                        template.exercises.push({
                                            name: 'New',
                                            sets: '5',
                                            reps: '5',
                                            weight: '100'
                                        });

                                        setTemplate({
                                            ...template
                                        });
                                    }}
                                >
                                    Add
                                </Button>
                            </h3>
                            {template.exercises.map((e, i) => {
                                return (
                                    <fieldset key={e.name}>
                                        <TextField
                                            label="Exercise Name"
                                            value={e.name}
                                            onChange={event =>
                                                handleChange({
                                                    event,
                                                    set: setTemplate,
                                                    template,
                                                    key: 'name',
                                                    index: i
                                                })
                                            }
                                            className={classes.textField}
                                            margin="normal"
                                            variant="filled"
                                        />
                                        <TextField
                                            label="Sets"
                                            value={e.sets}
                                            onChange={event =>
                                                handleChange({
                                                    event,
                                                    set: setTemplate,
                                                    template,
                                                    key: 'sets',
                                                    index: i
                                                })
                                            }
                                            className={classes.textField}
                                            margin="normal"
                                            variant="filled"
                                        />
                                        <TextField
                                            label="Reps"
                                            value={e.reps}
                                            onChange={event =>
                                                handleChange({
                                                    event,
                                                    set: setTemplate,
                                                    template,
                                                    key: 'reps',
                                                    index: i
                                                })
                                            }
                                            className={classes.textField}
                                            margin="normal"
                                            variant="filled"
                                        />
                                        <TextField
                                            label="Weight"
                                            value={e.weight}
                                            onChange={event =>
                                                handleChange({
                                                    event,
                                                    set: setTemplate,
                                                    template,
                                                    key: 'weight',
                                                    index: i
                                                })
                                            }
                                            className={classes.textField}
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </fieldset>
                                );
                            })}
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default withStyles(styles)(EditWorkoutTemplate);
