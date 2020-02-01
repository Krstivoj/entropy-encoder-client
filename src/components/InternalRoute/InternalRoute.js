import React                       from 'react';
import { Route, Redirect }         from 'react-router-dom';

import {isAuthorised}              from "../../services/AuthService";

export const InternalRoute = ({ component: Component, ...rest }) => {
    const isAuthorized = isAuthorised();
    return (
        <Route {...rest} render={(props) => {
            return ( isAuthorized
                    ? <Component {...props} />
                    : <Redirect to={{pathname:'/login', notificationShow:true, pathFromFiredAction: props.location.pathname}} />
            )}}/>
    );
};

