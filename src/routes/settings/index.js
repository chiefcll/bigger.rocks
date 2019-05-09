import React, { Component } from 'react';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

class Settings extends Component {
    render() {
        return (
            <List>
                <Link to="/exerciseWeight">
                    <ListItem button>
                        <ListItemIcon>
                            <FitnessCenterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Exercise Weight" />
                    </ListItem>
                </Link>
                <Link to="/workoutTemplates">
                    <ListItem button>
                        <ListItemIcon>
                            <FitnessCenterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Workout Templates" />
                    </ListItem>
                </Link>
            </List>
        );
    }
}

export default Settings;
