import React, {useState}      from 'react';

import Avatar                 from '@material-ui/core/Avatar';
import Button                 from '@material-ui/core/Button';
import CssBaseline            from '@material-ui/core/CssBaseline';
import TextField              from '@material-ui/core/TextField';
import Link                   from '@material-ui/core/Link';
import Grid                   from '@material-ui/core/Grid';
import LockOutlinedIcon       from '@material-ui/icons/LockOutlined';
import Typography             from '@material-ui/core/Typography';
import Container              from '@material-ui/core/Container';
import Snackbar               from "@material-ui/core/Snackbar";

import CustomSnackbar         from "../Snackbar/Snackbar";
import {constructAuthPayload} from "../../config/utils";
import {register}             from "../../services/AuthService";
import  styles                from "./Register.styles";

export default function Register(props) {

    const classes = styles();

    const [isSnackBarOpen,setSnackBarOpen] = useState(false);
    const [messageType,setMessageType] = useState('warning');
    const [message,setMessage] = useState(null);

    const closeNotification = () => {
        setSnackBarOpen(false);
    };
    const openNotification = () => {
        setSnackBarOpen(true);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.persist();

        const {elements} = event.target;
        const payload = constructAuthPayload(elements) ;
        const {success, message } = await register(payload);

        openNotification();
        if (success) {
            setMessage(message);
            setTimeout( () => props.history.push('/login'),2000);
        } else {
            setMessageType('error');
            setMessage(message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isSnackBarOpen}
                autoHideDuration={2000}
                onClose={closeNotification}
            >
                <CustomSnackbar
                    variant={messageType}
                    message={message}
                    onClose={closeNotification}
                />
            </Snackbar>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="off"
                                inputProps={{minLength: 4}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="off"
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
                                autoComplete="email"
                                type={'email'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputProps={{minLength: 6}}
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
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/#/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
