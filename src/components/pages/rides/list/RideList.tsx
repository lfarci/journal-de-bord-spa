import { Button, CircularProgress } from "@material-ui/core";
import React from "react";
import { Ride } from "../../../../types";
import { ZeroContentMessage } from "../../../common";
import RideListItem from "./RideListItem";

interface IRideList {
	rides: Ride[];
	onShowDetails: (rideId: number) => void;
	onDelete: (rideId: number) => void;
	onLoadMore: () => void;
	showLoadMore: boolean;
	loadingMore: boolean;
}

function AnyRides(props: IRideList) {
	return <div className="rides-list">
		<div>
			{
				props.rides.map((ride: Ride, index: number) => <RideListItem
					key={index}
					className="rides-list-item"
					ride={ride}
					onDelete={() => props.onDelete(ride.id!!)}
					onDetails={() => props.onShowDetails(ride.id!!)}
				/>)
			}
		</div>
		<div className="rides-list-load-button-container">
			{ props.showLoadMore && !props.loadingMore &&
				<Button
					className="rides-list-load-button"
					variant="contained"
					color="primary"
					onClick={props.onLoadMore}
				>
					Load more rides
				</Button>
			}
			{ props.showLoadMore && props.loadingMore &&
				<CircularProgress />
			}
		</div>
	</div>;
}

function RideList(props: IRideList) {

	const hasAnyRides = (): boolean => props.rides.length > 0;

	return <div className="rides-list">
		{
			hasAnyRides()
				? <AnyRides 
					rides={props.rides}
					onDelete={props.onDelete}
					onShowDetails={props.onShowDetails}
					onLoadMore={props.onLoadMore}
					showLoadMore={props.showLoadMore}
					loadingMore={props.loadingMore}
				/>
				: <ZeroContentMessage
					title="You have no rides"
					message="Start tracking your rides. You'll find them here!"
				/>
		}
	</div>;
}

export default RideList;