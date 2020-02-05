import React          from 'react';

import Table          from '@material-ui/core/Table';
import TableBody      from '@material-ui/core/TableBody';
import TableCell      from '@material-ui/core/TableCell';
import TableHead      from '@material-ui/core/TableHead';
import TableRow       from '@material-ui/core/TableRow';
import Paper          from '@material-ui/core/Paper';

import styles         from './ResponseTable.styles';
/**
 *
 * @param object
 * @returns {string[]}
 */
function getKeySet(object) {
    return Object.keys(object).filter(key =>
        !key.toString().includes('At') &&
        "id" !== key &&
        'symbolProbabilityPairs' !== key);
}

/**
 *
 * @param symbolCodeKeys
 * @returns {null}
 */
function generateTableHeader(symbolCodeKeys = []) {
    return symbolCodeKeys.length ?
            <TableRow>
                <TableCell align="center">{`Symbol`}</TableCell>
                <TableCell align="center">{`Code for symbol`}</TableCell>
            </TableRow>
        : null ;
}

/**
 *
 * @param camelCaseString
 * @returns {string}
 */
export function generateStringFromCamelCase(camelCaseString) {
    let letters = camelCaseString.toString().split('');
    let returnValue = '' ;
    letters.forEach(letter => returnValue +=  letter === letter.toUpperCase() ? ` ${letter.toLowerCase()}`: letter );
    return returnValue;
}

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export default function ResponseTable(props) {

    const {response = {} } = props ;
    const classes = styles();

    const responseKeys = getKeySet(response) ;

    let symbolCodeKeys = [] ;

    if(responseKeys.includes('symbolCodePairs')){
        symbolCodeKeys = getKeySet(response.symbolCodePairs)
    }

    const statisticDataKeys = responseKeys.filter(key => 'symbolCodePairs' !== key);
    return response.createdAt ? (
        <Paper className={classes.root} hidden={!response.entropy}>
            <Table className={classes.table}>
                <TableHead>
                    {
                        generateTableHeader(symbolCodeKeys)
                    }
                </TableHead>
                <TableBody>
                    {
                        symbolCodeKeys.map((key,index) => (
                            <TableRow key={`row-${index}`}>
                                <TableCell align="center">{key}</TableCell>
                                <TableCell align="center">{response.symbolCodePairs[key]}</TableCell>
                            </TableRow>
                        ))
                    }
                    {
                        statisticDataKeys.map((key,index) => (
                            <TableRow key={`details-${index}`}>
                                <TableCell>{generateStringFromCamelCase(key)}</TableCell>
                                <TableCell align="right">{response[key]}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Paper>
    ) : null;
}
