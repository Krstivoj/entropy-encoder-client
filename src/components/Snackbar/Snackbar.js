import React            from 'react';
import PropTypes        from 'prop-types';
import clsx             from 'clsx';

import CheckCircleIcon  from '@material-ui/icons/CheckCircle';
import ErrorIcon        from '@material-ui/icons/Error';
import InfoIcon         from '@material-ui/icons/Info';
import CloseIcon        from '@material-ui/icons/Close';
import IconButton       from '@material-ui/core/IconButton';
import SnackbarContent  from '@material-ui/core/SnackbarContent';
import WarningIcon      from '@material-ui/icons/Warning';
import styles           from './Snackbar.styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

export default function CustomSnackbar(props) {

    const classes = styles();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

CustomSnackbar.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};
