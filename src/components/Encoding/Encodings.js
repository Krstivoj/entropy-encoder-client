import React, {useEffect, useState}     from 'react';
import Pagination                       from 'rc-pagination';

import {makeStyles}                     from "@material-ui/core";
import CircularProgress                 from "@material-ui/core/CircularProgress";

import EncodingDetails                  from "./EncodingDetails";
import {NoData}                         from "../NoData/NoData";
import instance                         from "../../config/axiosConf";

import 'rc-pagination/assets/index.css';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
            width: '100%'
        },
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width:'100%'
    }
}));

/**
 * @return {null}
 */
export default function Encodings() {

    const classes = useStyles();
    const [currentPage,setCurrentPage] = useState(1);
    const [data,setData] = useState(null);
    const [isLoading,setLoading] = useState(true);

    const handlePageChange = (page) =>{
        setCurrentPage(page);
    };

    useEffect(() => {
        const params = {
            page : currentPage-1,
            size : 10
        };
        setLoading(true);
        instance.get('/api/encoder/encoding/all',{params : params}).then(response => {
            if(response && response.data) {
                setData(response.data);
            }
            setTimeout(() => setLoading(false),1000);
        });
    },[currentPage]);

    return(
        !isLoading ? <div className={classes.container}>
            <div>
                {
                    data && data.content && data.content.length ? data.content.map((item,index) => {
                        const key = `encoding-details-${index}`;
                        return <EncodingDetails {...item} key={key}/>
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
        </div> : <CircularProgress style={{width:'100px', height: '100px', position: 'absolute', top: '300px'}} disableShrink/>
    );
}
