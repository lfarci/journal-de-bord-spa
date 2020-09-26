import React from "react";
import RideDetails from "./details/RideDetails";
import { TrafficCondition } from "./form/fields";
import RideForm from "./form/RideForm";
import { Ride } from "../../types";
import Rides from "./list/Rides";
import PrivateRoute from "../navigation/PrivateRoute";

const model: Ride = {
	departure: {
		moment: new Date(),
		location: {
			id: 3,
			name: "Magasin",
			latitude: 23.45,
			longitude: 23.45
		},
		odometerValue: 10000
	},
	arrival: {
		moment: new Date(),
		location: {
			id: 4,
			name: "Maison",
			latitude: 25,
			longitude: 26
		},
		odometerValue: 12000
	},
	driverPseudonym: undefined,
	trafficCondition: TrafficCondition.NORMAL,
	comment: "Je suis un brave."
};

function TestRideForm() {
	return <RideForm
		ride={model}
		isDriving={false}
		onChange={() => { }}
		onSubmit={() => { }}
	/>;
}

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
			element={TestRideForm}
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