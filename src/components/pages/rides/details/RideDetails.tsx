import { User } from "oidc-client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AuthService } from "../../../../services/AuthService";
import { ResourcesService } from "../../../../services/ResourcesService";
import { getRideDistanceString, Ride, Stop } from "../../../../types";
import { getRideDurationString, getTrafficConditionString } from "../../../../types/Ride";
import { Page, Property, Section } from "../../../common";

type RideDetailsParams = { rideId: string };

type RideDetailsProps = RouteComponentProps<RideDetailsParams>;

interface IRideDetailsState {
	ride: Ride | undefined;
	isLoading: boolean;
	error: Error | undefined;
}

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

	const [state, setState] = useState<IRideDetailsState>({
		ride: undefined,
		isLoading: true,
		error: undefined
	});

	const showArrival = (): boolean => state.ride?.arrival !== undefined;

	useEffect(() => {
		const authService = new AuthService();
		const resources = new ResourcesService();
		const getRide = async () => {
			const user: User | null = await authService.getUser();
			if (user) {
				const userId = user?.profile.sub;
				const rideId = match.params.rideId!!;
				const ride = await resources.getRide(userId, rideId);
				setState({ ride: ride, isLoading: false, error: undefined });
			}
		};
		try {
			if (authService.isLoggedIn()) getRide();
		} catch (error) {
			setState({ ride: undefined, isLoading: true, error: error });
		}
	}, [match.params.rideId]);

	return <Page title={"Ride details"} isLoading={state.isLoading} error={state.error}>
		<Section title="Overview" divider>
			<Property 
				label="Distance"
				value={getRideDistanceString(state.ride!!)}
			/>
			<Property
				label="Duration"
				value={getRideDurationString(state.ride!!)}
			/>
			<Property
				label="Traffic"
				value={getTrafficConditionString(state.ride?.trafficCondition!!)}
			/>
			<Property
				label="Comment"
				value={state.ride?.comment!!}
			/>
		</Section>
		<StopSection title="Departure" divider stop={state.ride?.departure!!}/>
		{ showArrival() && <StopSection title="Arrival" stop={state.ride?.arrival!!}/>}
		
	</Page>
};

export default withRouter(RideDetails);