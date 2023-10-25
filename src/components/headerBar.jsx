import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        background: '#56df9a',
        color: '#0',
        marginBottom: '10px',
    },
}));


export function HeaderBar({text}) {
    const classes = useStyles();

    return(
    <Paper className={classes.header} elevation={3}>
        <Typography variant="h4">{text}</Typography>
    </Paper>
    )
    }