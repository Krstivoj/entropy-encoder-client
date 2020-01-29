import instance from "../config/axiosConf";


export async function getEncodings(getParams){
    const response = await instance.get(
        '/api/encoder/encoding/all',
        {params : getParams}) ;

    if(response && response.data) {
        return response.data;
    }
}

export async function encode(payload) {
    const response = await instance.post(`api/encoder/${payload.encoderType}`,payload);
    return response.data;
}
