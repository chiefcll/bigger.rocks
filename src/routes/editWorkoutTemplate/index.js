import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Header from '../../components/header';
import Button from '@material-ui/core/Button';
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

function saveWorkoutTemplate(template) {}

function EditWorkoutTemplate({
    workoutTemplates,
    classes,
    updateAppState,
    match
}) {
    const id = match.params.id;
    const [template] = useState(workoutTemplates[id]);

    return (
        <>
            <Header pageName="Exercise Weight">
                <Link to="/">
                    <Button
                        style={{ color: 'white' }}
                        onClick={() => saveWorkoutTemplate(template)}
                    >
                        Done
                    </Button>
                </Link>
            </Header>
            <Grid container spacing={12} alignItems={'center'}>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <TextField
                            label="Template Name"
                            defaultValue={template.name}
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                        />
                        Exercises
                        {template.exercises.map(e => {
                            return (
                                <>
                                    <TextField
                                        label="Exercise Name"
                                        defaultValue={e.name}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="filled"
                                    />
                                    <TextField
                                        label="Sets"
                                        defaultValue={e.sets}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="filled"
                                    />
                                    <TextField
                                        label="Weight"
                                        defaultValue={e.weight}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="filled"
                                    />
                                </>
                            );
                        })}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default withStyles(styles)(EditWorkoutTemplate);
