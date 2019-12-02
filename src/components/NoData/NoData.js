import React        from "react";

import Card         from "@material-ui/core/Card";
import Typography   from "@material-ui/core/Typography";
import CardContent  from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        margin: '20px'
    }
});

export const NoData = (props) => {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    You don't have any encoding saved
                </Typography>
            </CardContent>
        </Card>
    )
};
