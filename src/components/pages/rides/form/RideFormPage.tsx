import React from "react";
import { Ride } from "../../../../types";
import { TrafficCondition } from "./fields";
import RideForm from "./RideForm";

const defaultRide: Ride = {
	departure: {
		moment: new Date(2021, 1, 1, 12, 0, 0),
		location: {
			id: 3,
			name: "Magasin",
			latitude: 23.45,
			longitude: 23.45
		},
		odometerValue: 10000
	},
	arrival: {
		moment: new Date(2021, 1, 1, 13, 0, 0),
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

function RideFormPage() {
	return <RideForm
		ride={defaultRide}
		isDriving={false}
		onChange={() => { }}
		onSubmit={(data: any) => { console.log(JSON.stringify(data, null, 2)) }}
	/>;
}

export default RideFormPage;