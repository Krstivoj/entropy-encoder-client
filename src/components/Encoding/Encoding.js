import React, {useEffect, useState}     from 'react';
import Pagination                       from 'rc-pagination';

import CircularProgress                 from "@material-ui/core/CircularProgress";

import EncodingReport                   from "../EncodingReport/EncodingReport";
import {NoData}                         from "../NoData/NoData";
import webstomp                         from 'webstomp-client';
import {DropzoneArea}                   from 'material-ui-dropzone'
import LinearBuffer                     from "../ProgressBar/LinearProgressBar";
import {getEncodings}                   from "../../services/EncodingService";
import {uploadFile}                     from "../../services/FileService";
import styles                           from "./Encoding.style";
import 'rc-pagination/assets/index.css';

/**
 *
 * @returns {*}
 * @constructor
 */
export default function Encoding() {

    const classes = styles();
    const [currentPage,setCurrentPage] = useState(1);
    const [data,setData] = useState(null);
    const [isLoading,setLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);

    const handlePageChange = (page) =>{
        setCurrentPage(page);
    };

    const getData = async () => {
        const params = {
            page : currentPage-1,
            size : 10
        };
        setLoading(true);
        const data = await getEncodings(params);
        setData(data);
        setTimeout(() => setLoading(false),1000);
    };

    useEffect( () => {
        getData();
    },[currentPage]);

    const subscriber = (ws) => {
        ws.subscribe('/topic/reply', function (message) {
            const payload = JSON.parse(message.body);
            const currentPercentage = parseFloat(payload.content.percentage);
            setProgress(currentPercentage);
            if (currentPercentage === 100.00){
                setFiles([]);
            }
        });
    };
    const connectToWebSocket = () => {

        const webSocket = new WebSocket('ws://localhost:4000/api/ws');
        const ws = webstomp.over(webSocket);
        const token = localStorage.getItem("access_token");
        document.cookie = `token=${token}`;

        ws.connect({}, () => subscriber(ws));

        ws.onclose = function(event) {
            if (event.wasClean) {
                alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                alert('[close] Connection died');
            }
        };

        ws.onerror = function(error) {
            alert(`[error] ${error.message}`);
        };

    };

    const onChangeHandler = (fileList) => {
      setFiles(fileList);
    };

    const submit = async () => {
        const data = new FormData();
        connectToWebSocket();
        files.forEach(file =>
            data.append('file', file));
        await uploadFile(data);
    };
    return(
        !isLoading ? <div className={classes.container}>
            <div>
                {
                    data && data.content && data.content.length ? data.content.map((item,index) => {
                        const key = `encoding-details-${index}`;
                        return <EncodingReport {...item} key={key}/>
                    }) :
                        <NoData/>

                }
            </div>
            {
                data && data.content && data.content.length ?
                <Pagination
                    current={currentPage}
                    onChange={handlePageChange}
                    total={data.totalPages * 10}
                    style={{display: 'flex', justifyContent: 'center'}}
                /> : null
            }
            <DropzoneArea
                onChange={onChangeHandler}
                maxFileSize={30*100*100*100}
                initialFiles={files}
            />
            <button>SSS</button>
            <button onClick={submit}>Upload</button>
            <LinearBuffer value={progress}/>
        </div> :
            <CircularProgress
                style={{width:'100px', height: '100px', position: 'absolute', top: '300px'}}
                disableShrink
            />
    );
}
