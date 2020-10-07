import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface IApplicationBarProps {
	title: string;
	className: string;
	showBackArrow: boolean;
	onMenuClicked: () => void;
	showLogInButton: boolean;
	/**
	 * Action called when the login button is clicked.
	 */
	onLogIn: () => void;
	/**
	 * Action called when the logout button is clicked.
	 */
	onLogOut: () => void;
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

	return <AppBar position="static" className={props.className}>
		<Toolbar>
			{!props.showLogInButton &&
				<IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
					aria-label={props.showBackArrow ? "back" : "menu"}
					onClick={props.onMenuClicked}
				>
					{props.showBackArrow ? <ArrowBackIcon /> : <MenuIcon />}
				</IconButton>
			}
			<Typography variant="h6" className={classes.title}>
				{props.title}
			</Typography>
			{ props.showLogInButton
				? <Button variant="contained" color="primary" onClick={props.onLogIn}>Log In</Button>
				: <Button variant="contained" color="primary" onClick={props.onLogOut}>Log Out</Button>
			}
		</Toolbar>
	</AppBar>;
}

export default ApplicationBar;