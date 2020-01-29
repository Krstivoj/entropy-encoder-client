import instance from "../config/axiosConf";

export async function uploadFile(data){
    await instance.post('/api/file/upload', data,
        {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
}
