import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import Home from './components/home/Home';
import Landing from './components/landing/Landing';
import Locations from './components/locations/Locations';
import ApplicationBar from './components/navigation/ApplicationBar';
import NavigationDrawer, { INavigationDrawerEntry, NavigationDrawerKey } from './components/navigation/NavigationDrawer';
import PrivateRoute from './components/navigation/PrivateRoute';
import RidesRoutes from './components/rides/RidesRoutes';
import Statistics from './components/statistics/Statistics';
import { Application } from './services/Application';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: "75vh",
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
	if (pathname === "/home") title = "Home";
	else if (pathname === "/rides/form") title = "Ride form";
	else if (pathname.includes("/rides")) title = "Rides";
	else if (pathname === "/statistics") title = "Statistics";
	else if (pathname === "/locations") title = "Locations";
	else title = "Journal de bord";
	return title;
}

function getSelectedNavigationDrawerKey(): NavigationDrawerKey {
	let navigationKey: NavigationDrawerKey = "home";
	if (window.location.pathname === "/home") navigationKey = "home";
	if (window.location.pathname.includes("rides")) navigationKey = "rides";
	if (window.location.pathname.includes("locations")) navigationKey = "locations";
	if (window.location.pathname.includes("statistics")) navigationKey = "statistics";
	return navigationKey;
}

function isEntry(): boolean {
	return window.location.pathname === "/home"
		|| window.location.pathname === "/rides"
		|| window.location.pathname === "/statistics"
		|| window.location.pathname === "/locations";
}

interface IAppState {
	title: string;
	isBackArrowShown: boolean;
	showDrawer: boolean;
	selected: NavigationDrawerKey;
}

function App() {

	const classes = useStyles();
	const history = useHistory();

	const [state, setState] = useState<IAppState>({
		title: getTitle(),
		isBackArrowShown: !isEntry(),
		showDrawer: false,
		selected: getSelectedNavigationDrawerKey()
	});

	return (
		<Box className={classes.root}>
			<ApplicationBar
				title={state.title}
				showBackArrow={state.isBackArrowShown}
				onMenuClicked={() => {
					if (state.isBackArrowShown) {
						history.goBack();
						setState((prev) => ({...prev, isBackArrowShown: false}));
					} else {
						setState((prev) => ({...prev, showDrawer: true}));
					}
				}}
			/>
			<NavigationDrawer
				open={state.showDrawer}
				selected={state.selected}
				onClose={() => setState((prev) => ({...prev, showDrawer: false}))}
				onClick={(entry: INavigationDrawerEntry) => {
					setState((prev) => ({...prev, title: entry.label, selected: entry.key}));
				}}
			/>
			<Switch>
				<Route exact path="/"><Landing /></Route>
				<PrivateRoute
					path="/home"
					element={Home}
					isAuthenticated={Application.isAuthenticated()}
					redirectTo="/"
				/>

				<PrivateRoute
					path="/locations"
					element={Locations}
					isAuthenticated={Application.isAuthenticated()}
					redirectTo="/"
				/>
				<PrivateRoute
					path="/statistics"
					element={Statistics}
					isAuthenticated={Application.isAuthenticated()}
					redirectTo="/"
				/>
				<RidesRoutes isAuthenticated={Application.isAuthenticated()} redirectTo="/" />
			</Switch>
		</Box>
	);
}

export default withRouter(App);