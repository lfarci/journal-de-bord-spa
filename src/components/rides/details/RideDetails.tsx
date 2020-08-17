import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

type RideDetailsParams = { rideId: string };

type RideDetailsProps = RouteComponentProps<RideDetailsParams>;

const RideDetails: React.FC<RideDetailsProps> = ({ match }: RideDetailsProps) => {
	return (
		<p>Showing details for the ride with id of {match.params.rideId!!}</p>
	);
};

export default withRouter(RideDetails);