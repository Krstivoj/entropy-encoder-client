import React, {useState}    from "react";
import PropTypes            from 'prop-types';

import RadioGroup           from "@material-ui/core/RadioGroup";
import FormControlLabel     from "@material-ui/core/FormControlLabel";
import Radio                from "@material-ui/core/Radio";
import Button               from "@material-ui/core/Button";
import TextField            from "@material-ui/core/TextField";
import Snackbar             from "@material-ui/core/Snackbar";
import CustomSnackbar       from "../Snackbar/Snackbar";
import styles               from "./SubmitForm.styles";


export default function SubmitForm(props){

    const { pairs, sumProbabilities, getResults } = props;
    const classes = styles();

    const [plainSequence,setPlainSequence] = useState(null);
    const [encoderType,setEncoderType] = useState(null);
    const [message,setMessage] = useState(null);
    const [isSnackbarOpen,setSnackbarOpen] = useState(false);

    const handleSubmit = event => {

        event.preventDefault();
        event.persist();

        const payload = {
            sequence:      event.target.elements['sequence'].value,
            encoderType:   event.target.elements['encoderType'].value,
        };

        if(!payload.sequence || !payload.encoderType){
            setMessage('Empty sequence or undefined encoder type is not allowed!');
            setSnackbarOpen(true);
            return;
        }

        if(parseFloat(parseFloat(sumProbabilities()).toPrecision(2)) !== 1.0){
            setMessage("Sum of probabilities does not equal to 1.0");
            setSnackbarOpen(true);
        }
        else{
            if (payload.sequence !== plainSequence || payload.encoderType !== encoderType) {

                const letters = payload.sequence.split('');
                let counter = 0;

                letters.forEach(letter => {
                    if (pairs.some(pair => pair.symbol === letter))
                        counter++;
                });

                setEncoderType(payload.encoderType);
                setPlainSequence(payload.sequence);

                if (counter === letters.length && payload.sequence) {
                    let pairsPayload = {};
                    pairs.forEach(pair => {
                        pairsPayload = {...pairsPayload,[pair.symbol]:pair.probability}
                    });
                    payload.symbolProbabilityPairs = pairsPayload;
                    getResults(payload);
                } else {
                    setMessage("Some letter from plain sequence does not in table.");
                    setSnackbarOpen(true);
                }
            } else {
                setMessage("Your result is already here.");
                setSnackbarOpen(true);
            }
        }
    };
    const closeNotification = () => {
        setSnackbarOpen(false);
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
            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    id="plainSequence"
                    label="Plain sequence"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name={'sequence'}
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
