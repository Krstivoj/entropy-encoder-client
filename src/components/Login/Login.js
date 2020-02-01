import React, { useState}     from 'react';
import Avatar                 from '@material-ui/core/Avatar';
import Button                 from '@material-ui/core/Button';
import CssBaseline            from '@material-ui/core/CssBaseline';
import TextField              from '@material-ui/core/TextField';
import FormControlLabel       from '@material-ui/core/FormControlLabel';
import Checkbox               from '@material-ui/core/Checkbox';
import Link                   from '@material-ui/core/Link';
import Grid                   from '@material-ui/core/Grid';
import Typography             from '@material-ui/core/Typography';
import Container              from '@material-ui/core/Container';
import LockOutlinedIcon       from '@material-ui/icons/LockOutlined';
import Snackbar               from "@material-ui/core/Snackbar";

import CustomSnackbar         from '../Snackbar/Snackbar';
import {login}                from "../../services/AuthService";
import {constructAuthPayload} from "../../config/utils";
import styles                 from "./Login.style"

export default function SignIn(props) {

    const classes = styles();

    const [isSnackbarOpen,setSnackbarOpen] = useState(false);
    const [messageType,setMessageType] = useState('warning');
    const [message,setMessage] = useState(null);

    const handleSubmit = async (event) => {

        event.preventDefault();
        event.persist();

        const payload = constructAuthPayload(event.target.elements);
        const {success, message } = await login(payload);

        if (success){
            props.history.push('/');
        } else {
            setMessageType('error');
            setMessage(message);
            setSnackbarOpen(true);
        }
    };

    const closeNotification = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container component='main' maxWidth='xs'>
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
            <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='username'
                            label='Email Address or Username'
                            name='username'
                            autoComplete='off'
                            autoFocus
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='off'
                        />
                        <FormControlLabel
                            control={<Checkbox value='remember' color='primary'/>}
                            label='Remember me'
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href='/#/register' variant='body2'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
        </Container>
    );
}
