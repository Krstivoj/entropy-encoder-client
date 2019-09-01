// TODO make unpack response and populate array of EncodingDetails :)

import React, {useEffect, useState} from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import EncodingDetails from "./EncodingDetails";
import {makeStyles} from "@material-ui/core";
import instance from "../../config/axiosConf";


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

export default function Encodings(){

    const classes = useStyles();
    const [currentPage,setCurrentPage] = useState(1);
    const [data,setData] = useState(null);

    const handlePageChange = (page) =>{
        setCurrentPage(page);
    };

    useEffect(() => {
        const params = {
            page : currentPage-1,
            size : 10
        };
        instance.get('/api/encoder/encoding/all',{params : params}).then(response => {
            setData(response.data);
        });
    },[currentPage]);

    return(
        <div className={classes.container}>
            <div>
                {
                    data && data.content.map((item,index) => {
                        const key = `encoding-details-${index}`;
                        return <EncodingDetails {...item} key={key}/>
                    })
                }
            </div>
            {
                data &&
                <Pagination
                    current={currentPage}
                    onChange={handlePageChange}
                    total={data.totalPages * 10}
                    style={{display: 'flex', justifyContent: 'center'}}
                />
            }
        </div>
    );
}