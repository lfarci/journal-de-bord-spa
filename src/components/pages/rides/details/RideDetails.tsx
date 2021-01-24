import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getRideDistanceString, Stop } from "../../../../types";
import { getRideDurationString, getTrafficConditionString } from "../../../../types/Ride";
import { makeRide } from "../../../../types/__test__/helpers";
import { Page, Property, Section } from "../../../common";

type RideDetailsParams = { rideId: string };

type RideDetailsProps = RouteComponentProps<RideDetailsParams>;

interface IStopSectionProps {
	title: string;
	divider?: boolean;
	stop: Stop;
}

function StopSection(props: IStopSectionProps) {
	const divider = () => props.divider === undefined ? false : props.divider;
	const location = () => props.stop.location.name; 
	const date = () => props.stop.moment.toLocaleDateString(); 
	const time = () => props.stop.moment.toLocaleTimeString(); 
	return <Section title={props.title} divider={divider()}>
		<Property label="Location" value={location()} />
		<Property label="Date" value={date()}/>
		<Property label="Time" value={time()}/>
	</Section>;
}

const RideDetails: React.FC<RideDetailsProps> = ({ match }: RideDetailsProps) => {

	const ride = makeRide();

	const showArrival = (): boolean => ride.arrival !== undefined;

	return <Page title={`Ride ${match.params.rideId!!}`}>
		{/* <p>Showing details for the ride with id of {match.params.rideId!!}</p> */}
		<Section title="Overview" divider>
			<Property 
				label="Distance"
				value={getRideDistanceString(ride)}
			/>
			<Property
				label="Duration"
				value={getRideDurationString(ride)}
			/>
			<Property
				label="Traffic"
				value={getTrafficConditionString(ride.trafficCondition)}
			/>
			<Property
				label="Comment"
				value={ride.comment}
			/>
		</Section>
		<StopSection title="Departure" divider stop={ride.departure}/>
		{ showArrival() && <StopSection title="Arrival" stop={ride.arrival!!}/>}
		
	</Page>
};

export default withRouter(RideDetails);