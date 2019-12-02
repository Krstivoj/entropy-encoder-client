import React                           from 'react';
import { makeStyles }                  from '@material-ui/core/styles';
import Card                            from '@material-ui/core/Card';
import CardContent                     from '@material-ui/core/CardContent';
import Typography                      from '@material-ui/core/Typography';
import { generateStringFromCamelCase } from '../Table/Table';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        margin: '20px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: '20px',
    },
    pos: {
        marginBottom: 12,
    },
    details : {
        width:'20%',
        display: 'flex',
        flexDirection:'column',
        justifyItems:'center',
        justifyContent:'left',
        alignItems:'center'
    }
});

export default function EncodingDetails(props) {

    const classes = useStyles();
    const { createdAt } = props ;

    function generateReport(){

        const bullet = <span className={classes.bullet}>•</span>;
        const keys = Object.keys(props).filter(key => !key.toString().includes('At') && "id" !== key);
        return keys.map((key,index) => {
            const divKey = `div-${index}`;
            const text = `${generateStringFromCamelCase(key)} : `;
            return (
                <div key={divKey}>
                    {bullet}
                    {text}
                    { props[key] instanceof Object ?
                        Object.keys(props[key]).map((item,index) => {
                            const caption = `' ${item} '   :   ${props[key][item]}`;
                            return <div key={index} className={classes.details}>{caption}</div>
                        })
                        : props[key]
                    }
                </div>
            )
        })
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.plainSequence} -
                    {new Date(createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}
                </Typography>
                <div>
                    {
                        generateReport()
                    }
                </div>
            </CardContent>
        </Card>
    );
}
