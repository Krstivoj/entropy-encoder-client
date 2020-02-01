import React, {useEffect, useState}  from 'react';

import LinearProgress                from '@material-ui/core/LinearProgress';
import styles                        from './LinearProgressBar.styles';

export default function LinearBuffer(props) {

    const classes = styles();
    const [completed, setCompleted] = useState(0);

    useEffect(() => {
        function progress() {
            setCompleted(oldCompleted => {
                if (oldCompleted === 100) {
                    return 100;
                }
                return Math.min(props.value, 100);
            });
        }

        const timer = setInterval(progress, 500);
        return () => {
            clearInterval(timer);
        };
    }, [props.value]);
    return (
        <div className={classes.root}>
            <LinearProgress variant="determinate" value={completed}/>
        </div>
    );
}
