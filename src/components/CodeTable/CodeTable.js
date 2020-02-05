import React            from 'react';

import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableRow         from '@material-ui/core/TableRow';
import DeleteIcon       from '@material-ui/icons/Delete';
import EditIcon         from '@material-ui/icons/Edit';
import IconButton       from '@material-ui/core/IconButton';
import Button           from '@material-ui/core/Button';

import PropTypes        from 'prop-types';
import styles           from './CodeTable.style';
import Tooltip from "@material-ui/core/Tooltip";


export default function CodeTable(props){

    const {
        pairs = [],
        clearTable = () => {},
        deletePair = () => {},
        editPairPair = () => {}
    } = props;
    const classes = styles();
    return(
        <Table className={classes.table}>
            <TableBody>
                <TableRow key={'symbol'}>
                    <TableCell component='th' scope='row'>
                        Symbol
                    </TableCell>
                    <TableCell align='right'>Probability</TableCell>
                </TableRow>
                {
                    pairs.map(row => (
                        <TableRow key={row.symbol}>
                            <TableCell component='th' scope='row'>
                                {row.symbol}
                            </TableCell>
                            <TableCell align='right'>
                                {row.probability}
                            </TableCell>
                            <TableCell align='center'>
                                <Tooltip title='Delete Item' placement='top' interactive>
                                    <IconButton onClick={() => deletePair(row.symbol)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Edit Item' placement='top' interactive>
                                    <IconButton onClick={() => editPairPair(row.symbol)}>
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))
                }
                {
                    ( pairs.length > 0) &&
                    <TableRow>
                        <TableCell
                            component='th'
                            scope='row'
                            style={{border: 'none', marginRight: '0'}}
                            align='right'
                            colSpan={3}
                        >
                            <Button
                                variant='contained'
                                color='secondary'
                                style={{marginRight: '0'}}
                                onClick={clearTable}
                            >
                                Clear Table
                            </Button>
                        </TableCell>
                    </TableRow>
                }
            </TableBody>
        </Table>
    )
}

CodeTable.propTypes = {
    pairs: PropTypes.array.isRequired,
    clearTable: PropTypes.func.isRequired,
    deletePair: PropTypes.func.isRequired,
    editPairPair: PropTypes.func.isRequired
};
