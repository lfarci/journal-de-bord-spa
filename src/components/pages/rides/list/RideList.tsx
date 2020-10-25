import React from "react";
import { Ride } from "../../../../types";
import { ZeroContentMessage } from "../../../common";
import RideListItem from "./RideListItem";

interface IRideList {
	rides: Ride[];
	onShowDetails: (rideId: number) => void;
}

function AnyRides(props: IRideList) {
	return <div className="rides-list">{
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
	}</div>;
}

function RideList(props: IRideList) {

	const hasAnyRides = (): boolean => props.rides.length > 0;

	return <div className="rides-list">
		{
			hasAnyRides()
				? <AnyRides rides={props.rides} onShowDetails={props.onShowDetails} />
				: <ZeroContentMessage
					title="You have no rides"
					message="Start tracking your rides. You'll find them here!"
				/>
		}
	</div>;
}

export default RideList;