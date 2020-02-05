import {makeStyles} from "@material-ui/core";

const styles = makeStyles(theme => ({

    root: {
        flexGrow: 1
    },
    loader: {
        margin: theme.spacing(2),
        width : '100%',
        height: '100%',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default styles;
