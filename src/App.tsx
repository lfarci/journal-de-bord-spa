import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { Home, Landing, RidesRoutes } from './components/pages';
import PrivateRoute from './components/navigation/PrivateRoute';

import "./styles/App.scss";
import LogInCallback from './components/navigation/callbacks/LogInCallback';
import { AuthService } from './services/AuthService';
import SilentRenewCallback from './components/navigation/SilentRenewCallback';
import Profile from './components/pages/profile/Profile';
import { RideService } from './services/local/RideService';
import { LocationService } from './services/local/LocationService';
import { StopService } from './services/local/StopService';
import { makeRide, makeStop } from './types/__test__/helpers';

function App() {

	const authService = new AuthService();

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			LocationService.writeSampleToLocalStorage();
			StopService.writeSampleToLocalStorage();
			RideService.writeSampleToLocalStorage();
		}
	});

	return <Switch>

		<Route exact path="/"><Landing /></Route>

		<Route exact path="/login/callback"><LogInCallback /></Route>

		<Route exact path="/silent/callback"><SilentRenewCallback /></Route>

		<PrivateRoute
			path="/home"
			element={Home}
			isAuthenticated={authService.isLoggedIn()}
			redirectTo="/"
		/>

		<PrivateRoute
			path="/profile"
			element={Profile}
			isAuthenticated={authService.isLoggedIn()}
			redirectTo="/"
		/>

		<RidesRoutes isAuthenticated={authService.isLoggedIn()} redirectTo="/" />

	</Switch>;
}

export default withRouter(App);