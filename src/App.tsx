import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
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

function App() {

	const classes = useStyles();
	const history = useHistory();

	const [title, setTitle] = useState<string>("Home");
	const [isBackArrowShown, setShowBackArrow] = useState<boolean>(false);
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const [selected, setSelected] = useState<NavigationDrawerKey>("home");

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

export default App;