import React                       from 'react';
import { Route, Redirect }         from 'react-router-dom';

import {jwtDecoder,isTokenExpired} from "../../config/utils"

export const InternalRoute = ({ component: Component, ...rest }) => {
    let isAuthorize=false;
    const accessToken = localStorage.getItem('access_token');
    let decodedAccessToken= null;

    if(accessToken !== null){
        decodedAccessToken=jwtDecoder(accessToken)
    }

    if(decodedAccessToken && !isTokenExpired(decodedAccessToken.exp)){
        isAuthorize =! isAuthorize;
    }

    return (
        <Route {...rest} render={(props) => {
            return ( isAuthorize
                    ? <Component {...props} />
                    : <Redirect to={{pathname:'/login', notificationShow:true, pathFromFiredAction: props.location.pathname}} />
            )}}/>
    );
};

