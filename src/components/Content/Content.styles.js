import {makeStyles} from "@material-ui/core";

const drawerWidth = 240;

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width:'100%'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        display: 'flex',
        width: drawerWidth,
        flexShrink: 1,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0' ,
        padding: '20px 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'center'
    },
    content: {
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        justifyContent: 'center',
        width:'100%'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    logoutButton:{
        display: 'flex',
        right : 0,
        position:'absolute',
        marginRight: 10
    },
    listItem :  {
        display : 'flex',
        width: '100%',
        justifyItems: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    homeLink : {
        cursor : 'pointer'
    }
}));

export default styles;
