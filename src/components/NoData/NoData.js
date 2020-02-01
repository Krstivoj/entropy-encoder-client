import React        from "react";

import Card         from "@material-ui/core/Card";
import Typography   from "@material-ui/core/Typography";
import CardContent  from "@material-ui/core/CardContent";
import style        from "./NoData.style";

export const NoData = (props) => {

    const classes = style();
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
