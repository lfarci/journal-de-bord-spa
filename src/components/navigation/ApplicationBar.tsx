import React, { useEffect, useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { User } from 'oidc-client';
import { AuthService } from '../../services/AuthService';
import { Skeleton } from '@material-ui/lab';

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
			marginLeft: "1em"
		},
	}),
);

async function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function ApplicationBar(props: IApplicationBarProps) {

	const authService = new AuthService();
	const classes = useStyles();

	const [user, setUser] = useState<User | null>(null);

	const isReady = (): boolean => user !== null;

	useEffect(() => {
		const getUser = async () => {
			const user: User | null = await authService.getUser();
			setUser(user);
		};
		if (authService.isLoggedIn()) {
			getUser();
		}
	}, []);

	return <AppBar position="static" className={props.className}>
		<Toolbar>
			{ authService.isLoggedIn() && isReady() && <Avatar alt={user!!.profile.name} src={user!!.profile.picture} />}
			{ authService.isLoggedIn() && !isReady() && <Skeleton variant="circle"><Avatar /></Skeleton>}
			<Typography variant="h6" className={classes.title}>
				{props.title}
			</Typography>
			{ authService.isLoggedIn()
				? <Button variant="contained" color="primary" onClick={props.onLogOut}>Log Out</Button>
				: <Button variant="contained" color="primary" onClick={props.onLogIn}>Log In</Button>
			}
		</Toolbar>
	</AppBar>;
}

export default ApplicationBar;