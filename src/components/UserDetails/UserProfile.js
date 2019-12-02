import React, {useEffect, useState} from 'react';

import Avatar                       from '@material-ui/core/Avatar';
import Button                       from '@material-ui/core/Button';
import CssBaseline                  from '@material-ui/core/CssBaseline';
import TextField                    from '@material-ui/core/TextField';
import Grid                         from '@material-ui/core/Grid';
import LockOutlinedIcon             from '@material-ui/icons/LockOutlined';
import Typography                   from '@material-ui/core/Typography';
import { makeStyles }               from '@material-ui/core/styles';
import Container                    from '@material-ui/core/Container';
import Snackbar                     from "@material-ui/core/Snackbar";

import Notification                 from "../Notifications/Notifications";
import instance                     from "../../config/axiosConf";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
            width: '100%'
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logoutButton:{
        display: 'flex',
        right : 0,
        position:'absolute',
        marginRight: 10
    }
}));

/**
 * @return {null}
 */
export default function UserProfile(props) {

    const classes = useStyles();
    const [userProfile,setUserProfile] = useState({});
    const [isNotificationOpen,setNotificationOpen] = useState(false);
    const [message,setMessage] = useState(null);
    const [messageType,setMessageType] = useState('warning');

    const logout = () => {
        localStorage.clear();
        props.history.push('/#/login');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.persist();
        const payload = {
            oldPassword : event.target.elements['oldPassword'].value,
            newPassword : event.target.elements['newPassword'].value
        };
        instance.post('api/auth/changepassword',payload).then(response => {
            if(response.status >= 100 && response.status <= 300){
                setMessageType('success');
                setMessage(`${response.data.message}, You must login again`);
                setTimeout(() => logout(),3000);
            }else{
                setMessageType('warning');
                setMessage(response.data.message);
            }
            setNotificationOpen(true);
        });
    };

    useEffect(() => {
        const abortController = new AbortController();
        instance.get('api/auth/profile').then(response => {
            setUserProfile(response.data);
        });
        return () => {
            abortController.abort();
        }

    },[]);

    const closeNotification = () => {
        setNotificationOpen(false);
    };

    return userProfile.username ? (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isNotificationOpen}
                autoHideDuration={2000}
                onClose={closeNotification}
            >
                <Notification
                    variant={messageType}
                    message={message}
                    onClose={closeNotification}
                />
            </Snackbar>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit profile
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    autoComplete="off"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={userProfile.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="off"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={userProfile.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="oldPassword"
                                    label="Old password"
                                    type="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="newPassword"
                                    label="New password"
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Update profile
                        </Button>
                    </form>
                </div>
            </Container>
        </>
    ) : null ;
}
