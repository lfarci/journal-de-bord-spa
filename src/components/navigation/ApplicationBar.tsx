import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

interface IApplicationBarProps {
    title: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

function ApplicationBar(props: IApplicationBarProps) {
    const classes = useStyles();
    return <AppBar position="static">
        <Toolbar>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => console.log("Application bar menu has been clicked")}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                {props.title}
            </Typography>
        </Toolbar>
    </AppBar>;
}

export default ApplicationBar;