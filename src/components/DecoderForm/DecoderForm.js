import React, {useState}    from 'react';
import PropTypes            from 'prop-types';

import Button               from '@material-ui/core/Button';
import TextField            from '@material-ui/core/TextField';
import Snackbar             from '@material-ui/core/Snackbar';
import Grid                 from '@material-ui/core/Grid';

import CustomSnackbar       from '../Snackbar/Snackbar';
import styles               from './DecoderForm.styles';


export default function DecoderForm(props){

    const { pairs, sumProbabilities, getResults} = props;
    const classes = styles();

    // const [decoderType,setDecoderType] = useState(null);
    const [message,setMessage] = useState(null);
    const [isSnackbarOpen,setSnackbarOpen] = useState(false);

    const showMessage = (message) => {
        setMessage(message);
        setSnackbarOpen(true);
    };
    const handleSubmit = event => {

        event.preventDefault();
        event.persist();

        const payload = {
            sequence: event.target.elements['sequence'].value,
            length:   event.target.elements['plainLength'].value,
            // decoderType:   event.target.elements['decoderType'].value,
        };

        if(!payload.sequence){
            showMessage('Empty sequence is not allowed!');
            return;
        }

        if(parseFloat(parseFloat(sumProbabilities()).toPrecision(2)) !== 1.0){
            showMessage('Sum of probabilities does not equal to 1.0');
            return;
        }
        if (!payload.length) {
            showMessage('Length of plain sequence is required field');
            return;
        }
            let pairsPayload = {};
            pairs.forEach(pair => {
                pairsPayload = {...pairsPayload,[pair.symbol]:pair.probability}
            });
            payload.symbolProbabilityPairs = pairsPayload;
            getResults(payload);
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
                    variant='warning'
                    message={message}
                    onClose={closeNotification}
                />
            </Snackbar>
            <form className={classes.container} noValidate autoComplete='off' onSubmit={handleSubmit}>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                id='plainSequence'
                                label='Encoded sequence'
                                className={classes.textField}
                                margin='normal'
                                variant='outlined'
                                name={'sequence'}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/*<RadioGroup*/}
                                {/*className={classes.group}*/}
                            {/*>*/}
                                {/*<FormControlLabel*/}
                                    {/*value='arithmetic'*/}
                                    {/*control={<Radio/>}*/}
                                    {/*label='Arithmetic'*/}
                                    {/*name={'encoderType'}*/}
                                {/*/>*/}
                            {/*</RadioGroup>*/}
                            <TextField
                                label='Plain sequence length'
                                className={classes.textField}
                                margin='normal'
                                variant='outlined'
                                name={'plainLength'}
                                required
                                type='number'
                                inputProps={{max: 100, min: 1}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant='contained'
                                color='primary'
                                className={classes.button}
                                type={'submit'}
                            >
                                Encode
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </>
    );
}

DecoderForm.propTypes = {
    className: PropTypes.string,
    sumProbabilities: PropTypes.func.isRequired,
    pairs: PropTypes.array.isRequired
};
