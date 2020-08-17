import React from "react";
import { Route } from "react-router-dom";
import RideDetails from "./details/RideDetails";
import { TrafficCondition } from "./form/fields";
import RideForm from "./form/RideForm";
import { Ride } from "../../types";
import Rides from "./list/Rides";

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

export default function RidesRoutes(props: {}) {
	return <>
		<Route exact strict path="/rides"><Rides /></Route>
		<Route exact strict path="/rides/form">
			<RideForm
				ride={model}
				isDriving={false}
				onChange={() => { }}
				onSubmit={() => { }}
			/>
		</Route>
		<Route path="/rides/:rideId(\d+)"><RideDetails /></Route>
	</>;
}