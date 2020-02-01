import {makeStyles} from "@material-ui/core";

const styles = makeStyles({
    card: {
        minWidth: 275,
        margin: '20px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: '20px',
    },
    pos: {
        marginBottom: 12,
    },
    details : {
        width:'20%',
        display: 'flex',
        flexDirection:'column',
        justifyItems:'center',
        justifyContent:'left',
        alignItems:'center'
    },
    column : {
        display: 'flex',
        flexDirection: 'column',
        width: '50%'
    },
    row : {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    }
});

export default styles;
