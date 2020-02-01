import React, {useEffect, useState}     from 'react';

import Avatar                           from '@material-ui/core/Avatar';
import Button                           from '@material-ui/core/Button';
import CssBaseline                      from '@material-ui/core/CssBaseline';
import TextField                        from '@material-ui/core/TextField';
import Grid                             from '@material-ui/core/Grid';
import LockOutlinedIcon                 from '@material-ui/icons/LockOutlined';
import Typography                       from '@material-ui/core/Typography';
import Container                        from '@material-ui/core/Container';
import Snackbar                         from "@material-ui/core/Snackbar";

import CustomSnackbar                   from "../Snackbar/Snackbar";
import styles                           from './UserProfile.styles';
import {changePassword, getUserProfile} from "../../services/AuthService";

/**
 *
 * @param props
 * @returns {null}
 * @constructor
 */
export default function UserProfile(props) {

    const classes = styles();
    const [userProfile,setUserProfile] = useState({});
    const [isSnackbarOpen,setSnackbarOpen] = useState(false);
    const [message,setMessage] = useState(null);
    const [messageType,setMessageType] = useState('warning');

    const logout = () => {
        localStorage.clear();
        props.history.push('/#/login');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.persist();
        const payload = {
            oldPassword : event.target.elements['oldPassword'].value,
            newPassword : event.target.elements['newPassword'].value
        };

        const {success, message } = await changePassword(payload);

        if(success){
            setMessageType('success');
            setMessage(`${message}, You must login again`);
            setTimeout(() => logout(),3000);
        } else {
            setMessageType('warning');
            setMessage(message);
        }
        setSnackbarOpen(true);
    };

    useEffect(() => {
        const getProfile = async () => {
            const data = await getUserProfile();
            setUserProfile(data);
        };
        getProfile();
    },[]);

    const closeNotification = () => {
        setSnackbarOpen(false);
    };

    return userProfile.username ? (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isSnackbarOpen}
                autoHideDuration={2000}
                onClose={closeNotification}
            >
                <CustomSnackbar
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
