import axios                 from 'axios';
import {config as getConfig} from "../config/config";
import * as utils            from "./utils";

const baseUrl = getConfig().API_HOST;

const instance = axios.create({
    baseURL: baseUrl,
});

instance.defaults.headers.common['Accept'] = "application/json";
instance.defaults.headers.post['Content-Type'] = "application/json";
instance.defaults.adapter = require('axios/lib/adapters/http');

instance.interceptors.request.use((config) => {
    if( config.url === "/api/auth/signup" || config.url === "/api/auth/signin" ){
        return config;
    }
    else {
        const token = localStorage.getItem('access_token');
        config.headers.Authorization = token ? `Bearer ${token}` : null;
        return utils.checkToken(config);
    }
    }, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return error.response;
});
export default instance;