import React,{useState} from 'react';
import { makeStyles }   from '@material-ui/core/styles';
import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableRow         from '@material-ui/core/TableRow';
import Paper            from '@material-ui/core/Paper';
import SubmitForm       from "../SubmitForm/SubmitForm";
import InputForm        from "../InputForm/InputForm";
import SpanningTable    from "../Table/Table";
import DeleteIcon       from '@material-ui/icons/Delete';
import IconButton       from "@material-ui/core/IconButton";

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

    const [response,setResponse] = useState({});

    const addNewPair = (pair) => {
        setPairs([...pairs,pair]);
    };
    const calculateSumOfProbabilities = () => {
        let sum = 0.0 ;
        pairs.forEach(pair => sum += parseFloat(pair.probability));
        return sum;
    };
    const getEncodedResults = (promise) => {
        promise.then(apiResponse => {
            setResponse(apiResponse.data);
        });
    };
    const deletePair = (symbol) => {
        setPairs(pairs.filter(pair => pair.symbol !== symbol));
    };
    return (
        <>
            <div className={classes.container}>
                <div>
                    <div className={classes.inputContainer}>
                        <div className={classes.container}>
                            <Paper className={classes.root}>
                                <div className={classes.forms}>
                                    <InputForm
                                        pairs={pairs}
                                        addPair={addNewPair}
                                    />
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
                                                    <TableCell><IconButton onClick={() => deletePair(row.symbol)}><DeleteIcon/></IconButton></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Paper>
                    </div>
                </div>
                <div className={classes.results}>
                    <SpanningTable response={response}/>
                </div>
            </div>
        </>
    );
}