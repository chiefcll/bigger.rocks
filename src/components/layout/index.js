import React from 'react';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Header from '../header';
import Footer from '../footer';

const styles = {
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
};

const ROUTES = {
  Workouts: '/',
  History: '/history',
  Settings: '/settings',
  Workout: '/workout'
};
const PAGES = Object.keys(ROUTES);
function getPageNameFromPath(pathname) {
  return PAGES.filter(route => ROUTES[route] === pathname)[0];
}


class Layout extends React.Component {
  static getDerivedStateFromProps(props) {
    const {pathname} = props.history.location;
    const pageName = getPageNameFromPath(pathname);

    return {
      pageName,
      selectedIndex: PAGES.indexOf(pageName)
    };
  }

  navClicked = pageName => event => {
      let route = ROUTES[pageName];
      this.setState({
        pageName,
        selectedIndex: PAGES.indexOf(pageName)
      });
      this.props.history.push(route);
  }

  render() {
    const { classes, isAuthed } = this.props;
    const showLayout = isAuthed && this.state.selectedIndex < 3;

    if (showLayout) {
      return (
        <>
          <Header pageName={this.state.pageName} />
          <div style={{ padding: 8 }}>
            {this.props.children}
          </div>
          <Footer navClickHandler={this.navClicked} selectedIndex={this.state.selectedIndex} />
        </>
      )
    }
    
    return this.props.children;
  }
}

export default withRouter(withStyles(styles)(Layout));
