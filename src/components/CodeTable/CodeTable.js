import React , {useState}         from 'react';
import {useCallback, useEffect}   from 'react';
import { makeStyles }             from '@material-ui/core/styles';
import Table                      from '@material-ui/core/Table';
import TableBody                  from '@material-ui/core/TableBody';
import TableCell                  from '@material-ui/core/TableCell';
import TableRow                   from '@material-ui/core/TableRow';
import Paper                      from '@material-ui/core/Paper';
import DeleteIcon                 from '@material-ui/icons/Delete';
import EditIcon                   from '@material-ui/icons/Edit';
import IconButton                 from "@material-ui/core/IconButton";
import Button                     from "@material-ui/core/Button";
import CircularProgress           from "@material-ui/core/CircularProgress";

import SubmitForm                 from "../SubmitForm/SubmitForm";
import InputForm                  from "../InputForm/InputForm";
import SpanningTable              from "../Table/Table";
import EventEmitter               from "../EventEmitter/EventEmiter";
import ConfirmationDialog         from "../Modal/ConfirmationDialog";

const useStyles2 = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
            width: '100%'
        },
    },
    root: {
        margin: theme.spacing(1),
    },
    table: {
        width: '100%',
        padding: theme.spacing(1),
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableWrapper: {
        overflowX: 'hidden',
        margin: theme.spacing(1),
        width : '100%',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        margin: theme.spacing(1),
        position:'relative'
    },
    forms : {
        display: 'flex',
        flexDirection: 'row'
    },
    results :{
        display:'flex',
        flexDirection:'row',
        margin: theme.spacing(1),
    },
    container:{
        display:'flex',
        flexDirection:'row'
    }
}));

export default function CodeTable() {

    const classes = useStyles2();
    const [pairs, setPairs] = useState([]);

    const [response, setResponse] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const addNewPair = useCallback((pair) => {
        const indexOfPair = pairs.findIndex(pairElement => pairElement.symbol === pair.symbol);
        if ( indexOfPair >= 0 ) {
            const localPairs = [...pairs];
            localPairs[indexOfPair] = pair;
            setPairs(localPairs);
        } else {
            setPairs([...pairs, pair]);
        }
    }, [pairs]);

    const closeModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    const closeModalAndClear = useCallback(() => {
        setModalOpen(false);
        setPairs([]);
    }, []);


    useEffect(() => {
        EventEmitter.subscribe('addPair',pair => addNewPair(pair));
        EventEmitter.subscribe('cancelDeletion', event => closeModal(event));
        EventEmitter.subscribe('confirmDeletion', event => closeModalAndClear(event))
    },[addNewPair, closeModal, closeModalAndClear]);


    const calculateSumOfProbabilities = () => {
        let sum = 0.0 ;
        pairs.forEach(pair => sum += parseFloat(pair.probability));
        return sum;
    };
    const getEncodedResults = (promise) => {
        setLoading(true);
        promise.then(apiResponse => {
            setResponse(apiResponse.data);
            setTimeout( () => setLoading(false),1000);
        });
    };
    const deletePair = (symbol) => {
        setPairs(pairs.filter(pair => pair.symbol !== symbol));
    };
    const editPairPair = (symbol) => {
        const editObject = pairs.find(pair => pair.symbol === symbol);
        EventEmitter.dispatch('editPair', editObject);
    };
    const clearTable = () => {
        setModalOpen(true);
    };

    return (
        <>
            <ConfirmationDialog
                title={'Are you sure?'}
                contentText={'Are you sure to delete all records in table'}
                open={isModalOpen}
            />
            <div className={classes.container}>
                <div>
                    <div className={classes.inputContainer}>
                        <div className={classes.container}>
                            <Paper className={classes.root}>
                                <div className={classes.forms}>
                                    <InputForm pairs={pairs} />
                                </div>
                            </Paper>
                            <Paper className={classes.root}>
                                <SubmitForm
                                    pairs={pairs}
                                    sumProbabilities={calculateSumOfProbabilities}
                                    getResults={getEncodedResults}
                                />
                            </Paper>
                        </div>
                        <Paper className={classes.root}>
                            <div className={classes.tableWrapper}>
                                <Table className={classes.table}>
                                    <TableBody>
                                        <TableRow key={'symbol'}>
                                            <TableCell component="th" scope="row">
                                                Symbol
                                            </TableCell>
                                            <TableCell align="right">Probability</TableCell>
                                        </TableRow>
                                        {
                                            pairs.map(row => (
                                                <TableRow key={row.symbol}>
                                                    <TableCell component="th" scope="row">{row.symbol}</TableCell>
                                                    <TableCell align="right">{row.probability}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton onClick={() => deletePair(row.symbol)}><DeleteIcon/></IconButton>
                                                        <IconButton onClick={() => editPairPair(row.symbol)}><EditIcon/></IconButton>
                                                    </TableCell>
                                            </TableRow>
                                        ))
                                        }
                                        {
                                            ( pairs.length > 0) &&
                                            <TableRow>
                                                <TableCell component="th" scope="row" style={{border: 'none', marginRight: '0'}} align="right" colSpan={3}>
                                                    <Button variant="contained" color="secondary" style={{marginRight: '0'}} onClick={clearTable}> Clear Table</Button>
                                                </TableCell>
                                            </TableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        </Paper>
                    </div>
                </div>
                <div className={classes.results}>
                    { isLoading ?
                        <CircularProgress style={{marginLeft: '50px'}}/>
                        :
                        <SpanningTable response={response}/>
                    }
                </div>
            </div>
        </>
    );
}
