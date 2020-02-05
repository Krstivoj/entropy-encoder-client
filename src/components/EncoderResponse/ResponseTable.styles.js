import {makeStyles} from "@material-ui/core";

const styles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        display:'flex',
        padding: '30px 10px',
        margin : theme.spacing(1),
        justifyContent:'center',
        alignItems:'center',
    },
    table: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
}));


export default styles;
