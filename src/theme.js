import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
    palette: {
        primary: blueGrey,
        secondary: red
    },
    overrides: {
        MuiBottomNavigation: {
            root: {
                backgroundColor: blueGrey[500]
            }
        }
    }
});
