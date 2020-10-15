import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { User } from 'oidc-client';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';

import { AuthService } from '../../services/AuthService';
import { Skeleton } from '@material-ui/lab';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

interface IApplicationBarProps {
	/**
	 * Is the class name applied to the component root element.
	 */
	className: string;
	/**
	 * Is the title describing the content shown in the current page.
	 */
	title: string;
	/**
	 * When true the application abr doesn't show the avatar button a back
	 * button instead.
	 */
	showBackButton?: boolean;
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
		avatar: {
			cursor: "pointer"
		}
	}),
);

function ApplicationBar(props: IApplicationBarProps) {

	const authService = new AuthService();
	const classes = useStyles();
	const history = useHistory();


	const [user, setUser] = useState<User | null>(null);

	const isReady = () => user !== null;
	const showBackButton = () => props.showBackButton === undefined ? false : props.showBackButton;
	const showAvatar = () => authService.isLoggedIn() && isReady() && !showBackButton();
	const showAvatarSkeleton = () => authService.isLoggedIn() && !isReady() && !showBackButton();

	const goBack = (): void => history.goBack();
	const goToProfile = (): void => history.push('/profile');

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
			{ showBackButton() && <IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
					aria-label="back"
					onClick={goBack}
				>
					<ArrowBackRoundedIcon  />
				</IconButton>
			}
			{ showAvatar() && <Avatar
				alt={user!!.profile.name}
				src={user!!.profile.picture}
				onClick={goToProfile}
				className={classes.avatar}
			/> }
			{ showAvatarSkeleton() && <Skeleton variant="circle"><Avatar /></Skeleton>}
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