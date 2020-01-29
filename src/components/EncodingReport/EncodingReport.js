import React            from 'react';
import { makeStyles }   from '@material-ui/core/styles';
import Card             from '@material-ui/core/Card';
import CardContent      from '@material-ui/core/CardContent';
import Typography       from '@material-ui/core/Typography';

import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableHead        from '@material-ui/core/TableHead';
import TableRow         from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        margin: '20px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: '20px',
    },
    pos: {
        marginBottom: 12,
    },
    details : {
        width:'20%',
        display: 'flex',
        flexDirection:'column',
        justifyItems:'center',
        justifyContent:'left',
        alignItems:'center'
    },
    column : {
        display: 'flex',
        flexDirection: 'column',
        width: '50%'
    },
    row : {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    }
});

const columns = [
    {
        label: 'Plain Sequence',
        field: 'plainSequence'
    },
    {
        label: 'Encoded Sequence',
        field: 'encodedSequence'
    },
    {
        label: 'Entropy',
        field: 'entropy'
    },
    {
        label: 'Encoder Type',
        field: 'encoderType'
    },
    {
        label: 'Encoded Sequence Length',
        field: 'encodedSequenceLength'
    }
];

const headers = [
    {
        label: 'Symbol'
    },
    {
        label: 'Probability'
    }
];

function generateTableBody(keys, pairs){
    return keys.map((objKey, index) => {
        const rowKey = `row-${index}`;
        const cell1Key = `cell-1-index`;
        const cell2Key = `cell-2-index`;
        return  <TableRow key={rowKey}>
                    <TableCell align="center" key={cell1Key}>{objKey}</TableCell>
                    <TableCell align="center" key={cell2Key}>{pairs[objKey]}</TableCell>
                </TableRow>
    });
}
/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export default function EncodingReport(props) {

    const classes = useStyles();
    const { createdAt, plainSequence, symbolProbabilityPairs = {} } = props;
    const keys = Object.keys(symbolProbabilityPairs);

    return (
        <Card className={classes.card}>
            <CardContent>
                <div className={classes.row}>
                    <Typography gutterBottom variant="h5" component="h2">
                        { plainSequence } -
                        {new Date(createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}
                    </Typography>
                </div>
                <div className={classes.row}>
                    <div className={classes.column}>
                        {columns.map((column, index) => {
                            const key = `div-${index}`;
                            return <Typography key={key}>{column.label} : {props[column.field]}</Typography>
                        })
                        }
                    </div>
                    <div className={classes.column}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {
                                        headers.map((header,index) => {
                                            const cellKey = `cell-${index}`;
                                            return <TableCell align="center" key={cellKey}>{header.label}</TableCell>
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    generateTableBody(keys, symbolProbabilityPairs)
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
