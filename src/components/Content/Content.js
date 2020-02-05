import React                    from 'react';
import {Route, Switch}          from 'react-router';
import {HashRouter}             from 'react-router-dom';

import clsx                     from 'clsx';
import { useTheme }             from '@material-ui/core/styles';
import Drawer                   from '@material-ui/core/Drawer';
import CssBaseline              from '@material-ui/core/CssBaseline';
import AppBar                   from '@material-ui/core/AppBar';
import Toolbar                  from '@material-ui/core/Toolbar';
import List                     from '@material-ui/core/List';
import Typography               from '@material-ui/core/Typography';
import Divider                  from '@material-ui/core/Divider';
import IconButton               from '@material-ui/core/IconButton';
import MenuIcon                 from '@material-ui/icons/Menu';
import ChevronLeftIcon          from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon         from '@material-ui/icons/ChevronRight';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemIcon             from '@material-ui/core/ListItemIcon';
import ListItemText             from '@material-ui/core/ListItemText';
import Button                   from '@material-ui/core/Button';
import {Avatar}                 from '@material-ui/core';
import LockOutlinedIcon         from '@material-ui/icons/LockOutlined';
import Link                     from '@material-ui/core/Link';
import SvgIcon                  from '@material-ui/core/SvgIcon';
import Tooltip                  from '@material-ui/core/Tooltip';

import UserProfile              from '../UserDetails/UserProfile';
import {ListIcon}               from '../../config/costants';
import HomePage                from '../HomePage/HomePage';
import Encoding                 from '../Encoding/Encoding';
import Login                    from "../Login/Login";
import styles                   from "./Content.styles";

export default function Content(props) {

    const classes = styles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    const logout = (event) => {
        event.preventDefault();
        localStorage.clear();
        props.history.push('/#/login');
    };

    const navigateToHome = () => {
        props.history.push('/');
    };

    const checkIsLogged = (nextState,replace) => {
        console.log(nextState);
        console.log(replace);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Tooltip title='Show menu' placement='top' interactive>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={handleDrawerOpen}
                            edge='start'
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Go to home page' placement='top' interactive>
                        <Typography variant='h6' noWrap onClick={navigateToHome} className={classes.homeLink}>
                            Entropy encoder (Arithmetic or Huffman)
                        </Typography>
                    </Tooltip>
                    <Button color='inherit' onClick={logout} className={classes.logoutButton}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant='persistent'
                anchor='left'
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Tooltip title='Hide sidebar' placement='top' interactive>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </Tooltip>
                </div>
                <Divider />
                <List component='div' disablePadding>
                    <Tooltip title='Show all encodings' placement='top' interactive>
                        <ListItem button >
                            <Link className={classes.listItem} href={'/#/encodings'}>
                                <ListItemIcon>
                                    <Avatar>
                                        <SvgIcon>
                                            <ListIcon/>
                                        </SvgIcon>
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary={'All encodings'} />
                            </Link>
                        </ListItem>
                    </Tooltip>
                </List>
                <Divider />
                <List>
                    <Tooltip title='Show profile' placement='top' interactive>
                        <ListItem button>
                            <Link className={classes.listItem} href={'/#/profile'}>
                                <ListItemIcon>
                                    <Avatar>
                                        <LockOutlinedIcon/>
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary={'Profile'} />
                            </Link>
                        </ListItem>
                    </Tooltip>
                </List>
            </Drawer>
            <main className={clsx(classes.content, {[classes.contentShift]: open })} >
                <div className={classes.drawerHeader}>
                    <Switch>
                        <HashRouter>
                            <Route exact path='/' component={HomePage}/>
                            <Route exact path='/profile' component={UserProfile}/>
                            <Route exact path='/encodings' component={Encoding}/>
                            <Route exact path='/login' component={Login} onEnter={checkIsLogged}/>
                        </HashRouter>
                    </Switch>
                </div>
            </main>
        </div>
    );
}
