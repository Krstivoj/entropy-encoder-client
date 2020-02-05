import {makeStyles} from "@material-ui/core";

const styles = makeStyles(theme => ({
    textField: {
        minWidth: "100%",
        maxWidth: "100%",
        flexGrow: 1
    },
    button: {
        minWidth: "100%",
        maxWidth: "100%",
        flexGrow: 1
    },
    root: {
        flexGrow: 1
    },
    group: {
        margin: theme.spacing( 2.2),
        paddingBottom: theme.spacing(0.4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
        flexGrow: 1
    }
}));

export default styles;
