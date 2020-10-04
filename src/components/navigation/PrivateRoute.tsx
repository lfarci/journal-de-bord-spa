import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { Application } from "../../services/Application";
import { TokenRequestResponse } from "../../types/TokenRequestResponse";

declare type Component = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

export interface IPrivateRouteProps extends RouteProps {
	/**
	 * Is the componenent rendered if the the current user is authenticated.
	 */
	element: Component;
	/**
	 * Tells if the current user has been authenticated.
	 */
	isAuthenticated: boolean;
	/**
	 * Is the path to the component to redirect to in case the current user
	 * isn't authenticated.
	 */
	redirectTo: string;
}

interface IPrivateRouteState {
	isAuthenticated: boolean;
	isLoading: boolean;
	error: Error | null;
}

function PrivateRoute(props: IPrivateRouteProps) {

	const [state, setState] = useState<IPrivateRouteState>({
		isAuthenticated: false,
		isLoading: true,
		error: null
	});

	const showLoading = (): boolean => state.isLoading && state.error == null;
	const showError = (): boolean => !state.isLoading && state.error != null;
	const showRoute = (): boolean => !state.isLoading && state.error == null;

	useEffect(() => {
		if (Application.isReadyToRequestAccessToken()) {
			const authorizationCode: string = Application.getAuthorizationCode();
			Application.requestAccessToken(authorizationCode)
				.then((data: TokenRequestResponse) => {
					Application.saveToken(data);
					setState({ isAuthenticated: true, isLoading: false, error: null });
					console.log(JSON.stringify(props, null, 2));
					window.location.href = `${window.location.origin}${props.path as string}`;
				})
				.catch(error => {
					setState({ isAuthenticated: false, isLoading: false, error: error });
					console.error(error);
				});
		} else {
			setState({ isAuthenticated: Application.isAuthenticated(), isLoading: false, error: null });
		}
	}, []);

	return <>
		{showError() && <p>Error: {state.error?.message}</p>}
		{showLoading() && <p>Loading..., please be patient.</p>}
		{showRoute() && <Route
			{...props}
			render={(childrenProps) => state.isAuthenticated === true
				? <props.element {...childrenProps} />
				: <Redirect to={{ pathname: props.redirectTo, state: { from: childrenProps.location } }} />}
		/>}
	</>;
}

export default PrivateRoute;