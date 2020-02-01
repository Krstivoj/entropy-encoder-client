import {makeStyles} from "@material-ui/core";

const styles = makeStyles(theme => ({
    container: {
        display       : 'flex',
        flexWrap      : 'wrap',
        flexDirection : 'column',
        minWidth      : 300,
        margin: theme.spacing(0,1)
    },
    textField: {
        margin: theme.spacing(2)
    },
    button: {
        margin : theme.spacing(2)
    }
}));

export default styles;
