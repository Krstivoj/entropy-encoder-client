import axios from "axios";
import instance from "../config/axiosConf";

export async function login(payload){
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const response = await instance.post('/api/auth/signin', payload, { cancelToken: source.token });
    let errorMessage = null;
    let success = null;
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
    const response = await instance.post('/api/auth/signup',payload);
    return response.data;
}
