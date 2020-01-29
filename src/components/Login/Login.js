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
import { makeStyles }         from '@material-ui/core/styles';
import Container              from '@material-ui/core/Container';
import LockOutlinedIcon       from '@material-ui/icons/LockOutlined';
import Snackbar               from "@material-ui/core/Snackbar";

import Notification           from '../Notifications/Notifications';
import {login}                from "../../services/AuthService";
import {constructAuthPayload} from "../../config/utils";

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
        alignContent: 'center',
        justifyContent: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {

    const classes = useStyles();

    const [isNotificationOpen,setNotificationOpen] = useState(false);
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
            setNotificationOpen(true);
        }
    };

    const closeNotification = () => {
        setNotificationOpen(false);
    };

    return (
        <Container component='main' maxWidth='xs'>
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
