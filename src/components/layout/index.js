import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Footer from '../footer';

const styles = {
};

const ROUTES = {
    Workouts: '/',
    History: '/history',
    Settings: '/settings',
    Workout: '/workout',
    'Exercise Weight': '/exerciseWeight'
};
const PAGES = Object.keys(ROUTES);
function getPageNameFromPath(pathname) {
    return PAGES.filter(route => ROUTES[route] === pathname)[0];
}

class Layout extends React.Component {
    static getDerivedStateFromProps(props) {
        const { pathname } = props.history.location;
        const pageName = getPageNameFromPath(pathname);

        return {
            pageName,
            selectedIndex: PAGES.indexOf(pageName)
        };
    }

    constructor(props) {
        super(props);
        const { pathname } = props.history.location;
        const pageName = getPageNameFromPath(pathname);

        this.state = {
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
    };

    render() {
        const { isAuthed } = this.props;
        const { selectedIndex } = this.state;
        const showLayout =
            isAuthed && selectedIndex !== -1 && selectedIndex < 3;

        if (showLayout) {
            return (
                <>
                    {this.props.children}
                    <Footer
                        navClickHandler={this.navClicked}
                        selectedIndex={this.state.selectedIndex}
                    />
                </>
            );
        }

        return this.props.children;
    }
}

export default withRouter(withStyles(styles)(Layout));
