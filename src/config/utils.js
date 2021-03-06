import jwtDecode from 'jwt-decode';

export const jwtDecoder = token => jwtDecode(token);

export const isTokenExpired = expiryDate =>
    expiryDate < Math.round(new Date().getTime() / 1000);

export const checkToken=(config)=> {

    let decodedToken = jwtDecoder(config.headers.Authorization);

    if (isTokenExpired(decodedToken.exp)) {
        return false;
    }
    return config;
};

export function constructAuthPayload(formElements){
    const payload = {} ;
    for(const element of  formElements) {
        if(element.name){
            payload[element.name] = element.value ;
        }
    }
    return payload;
}
