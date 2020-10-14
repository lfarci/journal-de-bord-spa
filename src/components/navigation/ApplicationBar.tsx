import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

interface IApplicationBarProps {
	/**
	 * Is the title describing the content shown in the current page.
	 */
	title: string;
	/**
	 * Is the class name applied to the component root element.
	 */
	className: string;
	/**
	 * Tells the application bar to show the log in or log out button.
	 */
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