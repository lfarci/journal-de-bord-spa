import React, { } from "react";
import { Fab } from "@material-ui/core";
import { Ride } from "../../../../types";
import { TrafficCondition } from "../form/fields";

import AddIcon from '@material-ui/icons/Add';
import RideList from "./RideList";
import { useHistory, useRouteMatch } from "react-router-dom";

import "./Rides.scss";

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

const rides: Ride[] = [0, 1, 2, 3, 4, 5, 6].map(e => {
	model.id = e;
	return { ...model };
});

export type RideScreenContentKey = "form" | "list" | "details";

/**
 * Shows all the ride for the current user. The page action opens the ride
 * form.
 */
function Rides(props: {}) {

	const history = useHistory();
	const { path } = useRouteMatch();

	return <div className="rides">
			<RideList
				rides={rides}
				onShowDetails={(rideId: number) => history.push(`${path}/${rideId}`)}
			/>
			<Fab
				color="primary"
				aria-label="add"
				className="action-button"
				onClick={() => history.push(`${path}/form`)}
			>
				<AddIcon />
			</Fab>
		</div>;
}

export default Rides;