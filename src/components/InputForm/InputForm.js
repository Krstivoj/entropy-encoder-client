import {useEffect, useRef, useState} from "react";
import React                         from "react";
import PropTypes                     from "prop-types";

import {makeStyles}                  from "@material-ui/core";
import TextField                     from "@material-ui/core/TextField";
import Button                        from "@material-ui/core/Button";
import Snackbar                      from "@material-ui/core/Snackbar";

import Notification                  from "../Notifications/Notifications";
import EventEmitter                  from "../EventEmitter/EventEmiter";

const useStyles = makeStyles(theme => ({
    container: {
        display       : 'flex',
        flexWrap      : 'wrap',
        flexDirection : 'column',
        minWidth      : 300,
        margin: theme.spacing(0,1)
    },
    textField: {
        margin: theme.spacing(2)
    },
    button: {
        margin : theme.spacing(2)
    }
}));

export default function InputForm(props) {

    const {pairs}  = props;
    const classes = useStyles();
    const [isNotificationOpen,setNotificationOpen] = useState(false);
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
            setNotificationOpen(true);
            return;
        }
        if ( (!pairs.some(pair => pair.symbol === newPair.symbol) && parseFloat(newPair.probability) <= 1.0) || editablePair ) {
                EventEmitter.dispatch('addPair',newPair);
                event.target.reset();
                setEditablePair(null);
        } else {
            setMessage('Symbol already exists!');
            setNotificationOpen(true);
        }
        symbolRef.current.firstChild.control.focus();
    };
    const closeNotification = () => {
        setNotificationOpen(false);
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isNotificationOpen}
                autoHideDuration={2000}
                onClose={closeNotification}
            >
                <Notification
                    variant="warning"
                    message={message}
                    onClose={closeNotification}
                />
            </Snackbar>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    id="symbol"
                    label="Symbol"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    inputProps={{maxLength: 1}}
                    name={'symbol'}
                    required
                    onKeyPress={ event => {
                        if(event.key === 'Enter'){
                            event.preventDefault();
                            probabilityRef.current.firstChild.control.focus();
                        }
                    }}
                    ref={symbolRef}
                />
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
                    onKeyPress={ event =>{
                        if(event.key === 'Enter'){
                            symbolRef.current.firstChild.control.focus();
                        }
                    }}
                    ref={probabilityRef}
                />
                <Button variant="contained" color="primary" className={classes.button} type={'submit'}>
                    { editablePair ? "Update" : "Add"}
                </Button>
            </form>
        </>
    );
}
InputForm.propTypes = {
    className: PropTypes.string,
    pairs: PropTypes.array
};
