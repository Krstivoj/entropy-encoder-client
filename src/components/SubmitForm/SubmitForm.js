import {makeStyles} from "@material-ui/core";
import React, {useState} from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Notification from "../Notifications/Notifications";
import PropTypes from 'prop-types';

import instance from "../../config/axiosConf";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(0,1),
    },
    group: {
        margin: theme.spacing( 1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '100%',
        minWidth: 200,
        justifyContent: 'stretch',
        alignItems: 'stretch'
    },
    button: {
        margin: theme.spacing(2),
    }
}));

export default function SubmitForm(props){

    const { pairs, sumProbabilities, getResults } = props;
    const classes = useStyles();

    const [plainSequence,setPlainSequence] = useState(null);
    const [encoderType,setEncoderType] = useState(null);
    const [message,setMessage] = useState(null);
    const [isMessageVisible,setMessageVisible] = useState(false);

    const handleSubmit = event => {

        event.preventDefault();
        event.persist();

        const payload = {
            plainSequence: event.target.elements['plainSequence'].value,
            encoderType:   event.target.elements['encoderType'].value,
        };

        if(!payload.plainSequence || !payload.encoderType){
            setMessage('Empty sequence or undefined encoder type is not allowed!');
            setMessageVisible(true);
            return;
        }

        if(parseFloat(parseFloat(sumProbabilities()).toPrecision(2)) !== 1.0){
            setMessage("Sum of probabilities does not equal to 1.0");
            setMessageVisible(true);
        }
        else{
            if (payload.plainSequence !== plainSequence || payload.encoderType !== encoderType) {

                const letters = payload.plainSequence.split('');
                let counter = 0;

                letters.forEach(letter => {
                    if (pairs.some(pair => pair.symbol === letter))
                        counter++;
                });

                setEncoderType(payload.encoderType);
                setPlainSequence(payload.plainSequence);

                if (counter === letters.length && payload.plainSequence) {
                    let pairsPayload = {};
                    pairs.forEach(pair => {
                        pairsPayload = {...pairsPayload,[pair.symbol]:pair.probability}
                    });
                    payload.symbolProbabilityPairs = pairsPayload;
                    getResults(instance.post(`api/encoder/${payload.encoderType}`,payload));
                } else {
                    setMessage("Some letter from plain sequence does not in table.");
                    setMessageVisible(true);
                }
            } else {
                setMessage("Your result is already here.");
                setMessageVisible(true);
            }
        }
    };
    const closeNotification = () => {
        setMessageVisible(false);
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isMessageVisible}
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
                    id="plainSequence"
                    label="Plain sequence"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name={'plainSequence'}
                    required
                />
                <RadioGroup
                    name="gender1"
                    className={classes.group}
                >
                    <FormControlLabel
                        value="arithmetic"
                        control={<Radio/>}
                        label="Arithmetic"
                        name={'encoderType'}
                        className={classes.formControl}
                    />
                    <FormControlLabel
                        value="huffman"
                        control={<Radio/>}
                        label="Huffman"
                        name={'encoderType'}
                        className={classes.formControl}
                    />
                </RadioGroup>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type={'submit'}
                >
                    Encode
                </Button>
            </form>
        </>
    );
}
SubmitForm.propTypes = {
    className: PropTypes.string,
    sumProbabilities: PropTypes.func.isRequired,
    pairs: PropTypes.array
};