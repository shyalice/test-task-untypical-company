import React from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    appBar: {
        top: 0,
        left: 0,
        width: "100%",
        height: "80px",
        displayFlex: "flex",
        justifyContent: "center"
    },
    link: {
        textDecoration: "none",
        color: "#fff"
    }
}));

const Header = () => {
    const classes = useStyles();
    return(
        <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h4" className={classes.title}><Link to="/" className={classes.link}>Test Task</Link></Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;