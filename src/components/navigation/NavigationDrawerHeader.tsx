import React from "react";

import { Avatar, Container, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { User } from "../../types";

interface INavigationDrawerHeaderProps {
    /**
     * Is the user represented in the navigation drawer hear;
     */
    user: User;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyItems: "left",
        alignItems: "center",
        padding: 10

    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    name: {
        fontWeight: "bold"
    }
  }),
);

function NavigationDrawerHeader(props: INavigationDrawerHeaderProps) {
    const classes = useStyles();

    const getAvatarSource = (): string => props.user.pictureUri ? props.user.pictureUri : "";

    return <Container className={classes.root}>
        <Avatar alt={props.user.name} src={getAvatarSource()} className={classes.avatar} />
        <Container>
            <Typography className={classes.name} variant="body1">{props.user.name}</Typography>
            <Typography variant="caption">{props.user.username}</Typography>
        </Container>
    </Container>

}

export default NavigationDrawerHeader;