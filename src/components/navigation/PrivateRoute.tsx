import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";

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

function PrivateRoute(props: IPrivateRouteProps) {
    return <Route
        {...props}
        render={(childrenProps) => props.isAuthenticated === true
            ?  <props.element {...childrenProps} />
            : <Redirect to={{ pathname: props.redirectTo, state: { from: childrenProps.location } }} />}
    />
}

export default PrivateRoute;