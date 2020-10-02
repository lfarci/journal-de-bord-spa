import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { Application } from "../../services/Application";
import { Cookie } from "../../services/Cookie";
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

/**
 * This component extends the Route component. When executed it checks wheiter
 * the current user is authenticated and an authorization code available in the
 * URI.
 */
function RedirectUriRoute(props: IPrivateRouteProps) {

	const [state, setState] = useState<IPrivateRouteState>({
		isAuthenticated: false,
		isLoading: true,
		error: null
	});

	useEffect(() => {
		if (!Application.isAuthenticated() && Application.isAuthorizationCodeInURI()) {
			const authorizationCode: string = Application.getAuthorizationCode();
			Application.retrieveToken(authorizationCode)
				.then((data: TokenRequestResponse) => {
					Application.saveToken(data);
					setState({ isAuthenticated: true, isLoading: false, error: null });
				})
				.catch(error => {
					setState({ isAuthenticated: false, isLoading: false, error: error });
					console.error(error);
				});
		} else {
			setState({ isAuthenticated: Application.isAuthenticated(), isLoading: false, error: null });
		}
	}, [Application]);

	return <>
		{!state.isLoading && state.error != null && <p>Error: {state.error.message}</p>}
		{state.isLoading && state.error == null && <p>Loading..., please be patient.</p>}
		{!state.isLoading && state.error == null && <Route
			{...props}
			render={(childrenProps) => state.isAuthenticated === true
				? <props.element {...childrenProps} />
				: <Redirect to={{ pathname: props.redirectTo, state: { from: childrenProps.location } }} />}
		/>}
	</>;
}

export default RedirectUriRoute;