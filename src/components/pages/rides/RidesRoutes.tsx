import React from "react";
import RideDetails from "./details/RideDetails";
import Rides from "./list/Rides";
import PrivateRoute from "../../navigation/PrivateRoute";
import RideFormPage from "./form/RideFormPage";

export default function RidesRoutes(props: { isAuthenticated: boolean, redirectTo: string }) {
	return <>
		<PrivateRoute exact strict
			path="/rides"
			element={Rides}
			isAuthenticated={props.isAuthenticated}
			redirectTo={props.redirectTo}
		/>
		<PrivateRoute exact strict
			path="/rides/form"
			element={RideFormPage}
			isAuthenticated={props.isAuthenticated}
			redirectTo={props.redirectTo}
		/>
		<PrivateRoute
			path="/rides/:rideId(\d+)"
			element={RideDetails}
			isAuthenticated={props.isAuthenticated}
			redirectTo={props.redirectTo}
		/>
	</>;
}