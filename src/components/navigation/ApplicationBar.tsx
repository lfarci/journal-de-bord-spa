import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface IApplicationBarProps {
	title: string;
	showBackArrow: boolean;
	onMenuClicked: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			top: -1,
			letf: 0,
			right: 0
		},
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

	return <AppBar position="sticky" className={classes.root}>
		<Toolbar>
			<IconButton
				edge="start"
				className={classes.menuButton}
				color="inherit"
				aria-label={props.showBackArrow ? "back" : "menu"}
				onClick={props.onMenuClicked}
			>
				{ props.showBackArrow ? <ArrowBackIcon /> : <MenuIcon/> }
			</IconButton>
			<Typography variant="h6" className={classes.title}>
				{props.title}
			</Typography>
		</Toolbar>
	</AppBar>;
}

export default ApplicationBar;