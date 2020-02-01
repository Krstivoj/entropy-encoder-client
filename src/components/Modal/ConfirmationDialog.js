import React             from "react";

import Dialog            from "@material-ui/core/Dialog";
import DialogTitle       from "@material-ui/core/DialogTitle";
import DialogContent     from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions     from "@material-ui/core/DialogActions";
import Button            from "@material-ui/core/Button";
import EventEmitter      from "../../EventEmitter/EventEmiter";
import PropTypes         from "prop-types";


const ConfirmationDialog  = (props) => {

    const { open = false, contentText, title = ''} = props;

    const handleClose = () => {
        EventEmitter.dispatch('cancelDeletion',null);
    };
    const handleConfirmation = () => {
        EventEmitter.dispatch('confirmDeletion',null);
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {contentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirmation} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfirmationDialog;

ConfirmationDialog.propTypes = {
    open:        PropTypes.bool.isRequired,
    contentText: PropTypes.string.isRequired,
    title:       PropTypes.string.isRequired
};
