import {makeStyles} from "@material-ui/core";

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(0,1),
    },
    group: {
        margin: theme.spacing( 1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '100%',
        minWidth: 200,
        justifyContent: 'stretch',
        alignItems: 'stretch'
    },
    button: {
        margin: theme.spacing(2),
    }
}));

export default styles;
