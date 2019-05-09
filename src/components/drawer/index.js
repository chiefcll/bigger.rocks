import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

const styles = {
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    }
};

class AppDrawer extends React.Component {
    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
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
            </div>
        );

        return (
            <Drawer open={this.props.open} onClose={this.props.onClose}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.props.onClose}
                    onKeyDown={this.props.onClose}
                >
                    {sideList}
                </div>
            </Drawer>
        );
    }
}

AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppDrawer);
