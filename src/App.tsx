import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import Home from './components/home/Home';
import ApplicationBar from './components/navigation/ApplicationBar';
import NavigationDrawer, { INavigationDrawerEntry, NavigationDrawerKey } from './components/navigation/NavigationDrawer';
import RidesRoutes from './components/rides/RidesRoutes';
import { Application } from './services/Application';
import { Cookie } from './services/Cookie';
import { WebService } from './services/WebService';
import { TokenRequestResponse } from './types/TokenRequestResponse';

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
	if (pathname === "/") title = "Home";
	else if (pathname === "/rides/form") title = "Ride form";
	else if (pathname.includes("/rides")) title = "Rides";
	else if (pathname === "/statistics") title = "Statistics";
	else if (pathname === "/locations") title = "Locations";
	else title = "Default";
	return title;
}

function getSelectedNavigationDrawerKey(): NavigationDrawerKey {
	let navigationKey: NavigationDrawerKey = "home";
	if (window.location.pathname === "/") navigationKey = "home";
	if (window.location.pathname.includes("rides")) navigationKey = "rides";
	if (window.location.pathname.includes("locations")) navigationKey = "locations";
	if (window.location.pathname.includes("statistics")) navigationKey = "statistics";
	return navigationKey;
}

function isEntry(): boolean {
	return window.location.pathname === "/"
		|| window.location.pathname === "/rides"
		|| window.location.pathname === "/statistics"
		|| window.location.pathname === "/locations";
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
		setSelected(getSelectedNavigationDrawerKey());
		setShowBackArrow(!isEntry());

		let i = window.location.href.indexOf('code');
		if (!Application.isAuthenticated() && i !== -1) {
			console.log("Trying to retrieve the token...");
			const code: string = window.location.href.substring(i + 5);
			Application.retrieveToken(code)
				.then((data: TokenRequestResponse) => {
					Application.saveToken(data);
				})
				.catch(error => console.error(error));
		} else {
			console.log(`isAuthenticated: ${Application.isAuthenticated()}`);
			console.log(`accessTokenExist: ${Cookie.exist("access_token")}`);
		}

	}, []);

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
				<RidesRoutes />
				<Route path="/locations"><p>Locations</p></Route>
				<Route path="/statistics"><p>Statistics</p></Route>
			</Switch>
		</Box>
	);
}

export default withRouter(App);