import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import Home from './components/home/Home';
import ApplicationBar from './components/navigation/ApplicationBar';
import NavigationDrawer, { INavigationDrawerEntry, NavigationDrawerKey } from './components/navigation/NavigationDrawer';
import RidesRoutes from './components/rides/RidesRoutes';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			margin: -10,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		}
	}),
);

function getTitle(): string {
	const pathname: string = window.location.pathname;
	let title: string;
	if (pathname === "/") {
		title = "Home";
	} else if (pathname === "/rides/form") {
		title = "Ride form";
	} else if (pathname.includes("/rides")) {
		title = "Rides";
	} else if (pathname === "/statistics") {
		title = "Statistics";
	} else if (pathname === "/locations") {
		title = "Locations";
	} else {
		throw new RangeError();
	}
	return title;
}

function App() {

	const classes = useStyles();
	const history = useHistory();

	const [title, setTitle] = useState<string>(getTitle());
	const [isBackArrowShown, setShowBackArrow] = useState<boolean>(false);
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const [selected, setSelected] = useState<NavigationDrawerKey>("home");

	useEffect(() => {
		setTitle(getTitle());
		if (window.location.pathname === "/") setSelected("home");
		if (window.location.pathname.includes("rides")) setSelected("rides");
		if (window.location.pathname.includes("locations")) setSelected("locations");
		if (window.location.pathname.includes("statistics")) setSelected("statistics");
	});

	return (
		<Box className={classes.root}>
			<ApplicationBar
				title={title}
				showBackArrow={isBackArrowShown}
				onMenuClicked={() => {
					if (isBackArrowShown) {
						history.goBack();
						setShowBackArrow(false)
					} else {
						setShowDrawer(true);
					}
				}}
			/>
			<NavigationDrawer
				open={showDrawer}
				selected={selected}
				onClose={() => setShowDrawer(false)}
				onClick={(entry: INavigationDrawerEntry) => {
					setTitle(entry.label)
					setSelected(entry.key);
				}}
			/>
			<Switch>
				<Route exact path="/"><Home /></Route>
				<RidesRoutes onHistoryPushed={() => setShowBackArrow(true)} />
				<Route exact path="/locations"><p>Locations</p></Route>
				<Route exact path="/statistics"><p>Statistics</p></Route>
			</Switch>
		</Box>
	);
}

export default withRouter(App);