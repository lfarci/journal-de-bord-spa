import React from "react";
import { Ride } from "../../../types";
import RideListItem from "./RideListItem";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 10,
		},
	}),
);

interface IRideList {
	rides: Ride[];
	onShowDetails: (rideId: number) => void;
}

function RideList(props: IRideList) {
s
	const classes = useStyles();

	return (
		<div>
			{
				props.rides.map((ride: Ride) => <RideListItem
					className={classes.root}
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
					onDetails={() => props.onShowDetails(ride.id!!) }
				/>)
			}
		</div>
	);
}

export default RideList;