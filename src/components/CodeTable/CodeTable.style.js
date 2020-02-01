import {makeStyles} from "@material-ui/core";

const styles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
            width: '100%'
        },
    },
    root: {
        margin: theme.spacing(1),
    },
    table: {
        width: '100%',
        padding: theme.spacing(1),
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableWrapper: {
        overflowX: 'hidden',
        margin: theme.spacing(1),
        width : '100%',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        margin: theme.spacing(1),
        position:'relative'
    },
    forms : {
        display: 'flex',
        flexDirection: 'row'
    },
    results :{
        display:'flex',
        flexDirection:'row',
        margin: theme.spacing(1),
    },
    container:{
        display:'flex',
        flexDirection:'row'
    }
}));

export default styles;
