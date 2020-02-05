import instance from "../config/axiosConf";

export async function decode(payload) {
    const decoderType = payload.encoderType || 'arithmetic';
    const response = await instance.post(`api/decoder/${decoderType}`,payload);
    return response.data;
}
