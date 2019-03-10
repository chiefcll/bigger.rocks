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
  Settings: '/settings'
};
const PAGES = Object.keys(ROUTES);

class Layout extends React.Component {
  constructor(props) {
    super();
    const {pathname} = props.history.location;
    const pageName = this.getPageNameFromPath(pathname);

    this.state = {
      pageName,
      selectedIndex: PAGES.indexOf(pageName)
    };
  }

  getPageNameFromPath(pathname) {
    return PAGES.filter(route => ROUTES[route] === pathname)[0];
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
    const showFooter = isAuthed && this.state.selectedIndex !== -1;

    return (
      <>
        <Header pageName={this.state.pageName} />
        <div style={{ padding: 8 }}>
        {this.props.children}
        </div>
        {showFooter &&
          <Footer navClickHandler={this.navClicked} selectedIndex={this.state.selectedIndex} />
        }
      </>
    );
  }
}

export default withRouter(withStyles(styles)(Layout));
