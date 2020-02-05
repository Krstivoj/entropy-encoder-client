import React   from 'react';

import style   from './DecoderResponse.styles';

/**
 * @return {null}
 */
export default function DecoderResponse(props){

    const classes = style();
    if (props.data) {
        return (
            <div className={classes.root}>
                <div>
                    <h2>Plain sequence is : </h2>
                    {props.data}
                </div>
            </div>
        )
    } else {
        return null;
    }
};
