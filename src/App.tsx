import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Home from './components/home/Home';
import Landing from './components/landing/Landing';
import Locations from './components/locations/Locations';
import PrivateRoute from './components/navigation/PrivateRoute';
import RidesRoutes from './components/rides/RidesRoutes';
import Statistics from './components/statistics/Statistics';
import { Application } from './services/Application';

import "./styles/App.scss";

function App() {
	return <Switch>

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

	</Switch>;
}

export default withRouter(App);