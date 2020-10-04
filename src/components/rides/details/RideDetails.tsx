import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Page } from "../../common";

type RideDetailsParams = { rideId: string };

type RideDetailsProps = RouteComponentProps<RideDetailsParams>;

const RideDetails: React.FC<RideDetailsProps> = ({ match }: RideDetailsProps) => {
	return <Page title={`Ride ${match.params.rideId!!}`}>
		<p>Showing details for the ride with id of {match.params.rideId!!}</p>
	</Page>
};

export default withRouter(RideDetails);