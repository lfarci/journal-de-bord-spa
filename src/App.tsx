import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { Home, Landing, RidesRoutes } from './components/pages';
import PrivateRoute from './components/navigation/PrivateRoute';
import Statistics from './components/statistics/Statistics';

import "./styles/App.scss";
import LogInCallback from './components/navigation/callbacks/LogInCallback';
import { AuthService } from './services/AuthService';
import SilentRenewCallback from './components/navigation/SilentRenewCallback';
import Profile from './components/pages/profile/Profile';

function App() {

	const authService = new AuthService();

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