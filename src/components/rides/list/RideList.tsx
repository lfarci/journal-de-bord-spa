import React from "react";
import { Ride } from "../../../types";
import RideListItem from "./RideListItem";
import { Page } from "../../common";

interface IRideList {
	rides: Ride[];
	onShowDetails: (rideId: number) => void;
}

function RideList(props: IRideList) {
	return <Page title="My rides" selected="rides">
		{
			props.rides.map((ride: Ride, index: number) => <RideListItem
				key={index}
				className="rides-list-item"
				ride={ride}
				onDelete={() => {
					// TODO: Show confirmation dialog
					console.log(`[DELETE] Ride { id: ${ride.id} }`)
					if (window.confirm("Do you really want to delete this ride?")) {
						// TODO: request deletion to the backend
						console.log("[DELETE] Deletion has been confirmed.");
					} else {
						console.log("[DELETE] Deletion has been canceled.");
					}
				}}
				onDetails={() => props.onShowDetails(ride.id!!)}
			/>)
		}
	</Page>;
}

export default RideList;