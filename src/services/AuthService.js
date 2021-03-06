import axios                        from "axios";
import instance                     from "../config/axiosConf";
import {isTokenExpired, jwtDecoder} from "../config/utils";

export async function login(payload){
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const response = await instance.post('/api/auth/sign-in', payload, { cancelToken: source.token });
    let errorMessage = null;
    let success;
    if(response && response.data && response.data.accessToken){
        source.cancel();
        localStorage.setItem('access_token',response.data.accessToken);
        success = true;
    } else {
        errorMessage = response && response.data ? response.data.message : 'Something has gone wrong!' ;
        success = false;
    }
    return {
        success : success,
        message : errorMessage
    };
}

export async function register(payload){
    const response = await instance.post('/api/auth/sign-up',payload);
    return response.data;
}

export function isAuthorised(){
    const accessToken = localStorage.getItem('access_token');
    let decodedAccessToken = null;
    if(accessToken !== null){
        decodedAccessToken = jwtDecoder(accessToken)
    }
    return !!(decodedAccessToken && !isTokenExpired(decodedAccessToken.exp));
}

export async function changePassword(payload){
    const response = await instance.put('api/auth/password',payload);
    let message;
    let success;
    if(response.status >= 100 && response.status <= 300){
        success = true;
        message = `${response.data.message}, You must login again`;
    } else{
        success = false;
        message = response.data.message;
    }
    return {
        success : success,
        message : message
    }
}

export async function getUserProfile(){
    const response = await instance.get('api/auth/profile');
    return response.data;
}
