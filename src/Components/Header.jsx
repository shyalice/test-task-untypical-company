import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = () => (
    <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h6">Test Task</Typography>
        </Toolbar>
    </AppBar>
)

export default Header;