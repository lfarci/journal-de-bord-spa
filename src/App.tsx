import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { Home, Landing, RidesRoutes } from './components/pages';
import Locations from './components/locations/Locations';
import PrivateRoute from './components/navigation/PrivateRoute';
import Statistics from './components/statistics/Statistics';

import "./styles/App.scss";
import LogInCallback from './components/navigation/LogInCallback';
import { AuthService } from './services/AuthService';

function App() {

	const authService = new AuthService();

	return <Switch>

		<Route exact path="/"><Landing /></Route>

		<Route exact path="/login/callback"><LogInCallback /></Route>

		<PrivateRoute
			path="/home"
			element={Home}
			isAuthenticated={authService.isLoggedIn()}
			redirectTo="/"
		/>

		<PrivateRoute
			path="/locations"
			element={Locations}
			isAuthenticated={authService.isLoggedIn()}
			redirectTo="/"
		/>

		<PrivateRoute
			path="/statistics"
			element={Statistics}
			isAuthenticated={authService.isLoggedIn()}
			redirectTo="/"
		/>

		<RidesRoutes isAuthenticated={authService.isLoggedIn()} redirectTo="/" />

	</Switch>;
}

export default withRouter(App);