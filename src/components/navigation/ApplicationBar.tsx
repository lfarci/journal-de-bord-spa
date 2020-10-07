import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Application } from '../../services/Application';

interface IApplicationBarProps {
	title: string;
	className: string;
	showBackArrow: boolean;
	onMenuClicked: () => void;
	/**
	 * Action called when the login button is clicked.
	 */
	onLogin: () => void;
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
			{Application.isAuthenticated() &&
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
			{/* {Application.isAuthenticated()
				? <Button
					variant="contained"
					color="primary"
					onClick={() => { Application.logout() }}>
					Log Out
				</Button>
				: <Button
					variant="contained"
					color="primary"
					onClick={() => { Application.login() }}>
					Log In
				</Button>
			} */}
			<Button variant="contained" color="primary" onClick={props.onLogin}>Log In</Button>
		</Toolbar>
	</AppBar>;
}

export default ApplicationBar;