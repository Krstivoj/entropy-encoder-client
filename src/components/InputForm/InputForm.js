import {useEffect, useRef, useState} from "react";
import React                         from "react";
import PropTypes                     from "prop-types";

import TextField                     from "@material-ui/core/TextField";
import Button                        from "@material-ui/core/Button";
import Snackbar                      from "@material-ui/core/Snackbar";
import Grid                          from "@material-ui/core/Grid";

import CustomSnackbar                from "../Snackbar/Snackbar";
import EventEmitter                  from "../../EventEmitter/EventEmiter";
import styles                        from "./InputForm.style";

export default function InputForm(props) {

    const {pairs}  = props;
    const classes = styles();
    const [isSnackbarOpen,setSnackbarOpen] = useState(false);
    const [message,setMessage] = useState(null);
    const symbolRef = useRef(null);
    const probabilityRef = useRef(null);
    const [editablePair, setEditablePair] = useState(null);

    useEffect( () => {
        if( editablePair ) {
            symbolRef.current.firstChild.control.value = editablePair.symbol;
            probabilityRef.current.firstChild.control.value = editablePair.probability;
        }
    },[editablePair]);

    const handlePairForEdit = (pairForEdit) => {
        setEditablePair(pairForEdit);
    };

    useEffect(() => {
        EventEmitter.subscribe('editPair', pairForEdit => handlePairForEdit(pairForEdit))
    },[]);

    const handleSubmit = event => {

        event.preventDefault();
        event.persist();
        const newPair =
            {
                symbol      : event.target.elements['symbol'].value,
                probability : event.target.elements['probability'].value
            };
        if(!newPair.symbol || !newPair.probability){
            setMessage('Empty fields not allowed!');
            setSnackbarOpen(true);
            return;
        }
        if ( (!pairs.some(pair => pair.symbol === newPair.symbol) && parseFloat(newPair.probability) <= 1.0) || editablePair ) {
                EventEmitter.dispatch('addPair',newPair);
                event.target.reset();
                setEditablePair(null);
        } else {
            setMessage('Symbol already exists!');
            setSnackbarOpen(true);
        }
        symbolRef.current.firstChild.control.focus();
    };
    const closeNotification = () => {
        setSnackbarOpen(false);
    };
    const handleEnterPress = (event, reference) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            reference.current.firstChild.control.focus();
        }
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isSnackbarOpen}
                autoHideDuration={2000}
                onClose={closeNotification}
            >
                <CustomSnackbar
                    variant="warning"
                    message={message}
                    onClose={closeNotification}
                />
            </Snackbar>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                id="symbol"
                                label="Symbol"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                inputProps={{maxLength: 1}}
                                name={'symbol'}
                                required
                                onKeyPress={event => handleEnterPress(event, probabilityRef)}
                                ref={symbolRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="probability"
                                label="Probability"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                autoComplete={'off'}
                                type={'number'}
                                inputProps={{max: 1.0, min: 0.0}}
                                name={'probability'}
                                required
                                onKeyPress={ event => handleEnterPress(event,symbolRef)}
                                ref={probabilityRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" className={classes.button} type={'submit'}>
                                { editablePair ? "Update" : "Add"}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </>
    );
}
InputForm.propTypes = {
    className: PropTypes.string,
    pairs: PropTypes.array
};
