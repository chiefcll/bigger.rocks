import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SettingsIcon from '@material-ui/icons/Settings';
import { blueGrey } from '@material-ui/core/colors';

const styles = {
    root: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: blueGrey[500]
    }
};

const icons = {
    root: {
        color: 'green'
    },
    colorPrimary: {
        color: 'red'
    }
};

function SimpleBottomNavigation({ classes, navClickHandler, selectedIndex }) {
    return (
        <BottomNavigation
            value={selectedIndex}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                label="Workouts"
                icon={
                    <FitnessCenterIcon className={icons.root} color="primary" />
                }
                onClick={navClickHandler('Workouts')}
            />
            <BottomNavigationAction
                label="History"
                icon={<CalendarTodayIcon classes={icons} />}
                onClick={navClickHandler('History')}
            />
            <BottomNavigationAction
                label="Settings"
                icon={<SettingsIcon classes={icons} />}
                onClick={navClickHandler('Settings')}
            />
        </BottomNavigation>
    );
}

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SimpleBottomNavigation));
