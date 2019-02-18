import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = {
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  navClicked = (label, event) => {
      let route = {
          Workouts: '/',
          History: '/history',
          Settings: '/settings'
      }[label];
      this.props.history.push(route);
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Workouts" icon={<FitnessCenterIcon />} onClick={this.navClicked.bind(this, "Workouts")} />
        <BottomNavigationAction label="History" icon={<CalendarTodayIcon />} onClick={this.navClicked.bind(this, "History")} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} onClick={this.navClicked.bind(this, "Settings")} />
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SimpleBottomNavigation));
