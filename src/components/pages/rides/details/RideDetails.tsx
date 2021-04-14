import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import { Fab, Typography } from "@material-ui/core";

import { getRideDistanceString, Ride, Stop } from "../../../../types";
import { getRideDurationString, getTrafficConditionString } from "../../../../types/Ride";
import { Page, Property, Section } from "../../../common";

import "./RideDetails.scss";
import RideService from "../../../../services/Rides";

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
        {props.stop
            ? <div>
                <Property label="Location" value={location()} />
                <Property label="Date" value={date()} />
                <Property label="Time" value={time()} />
            </div>
            : <Typography>No stop.</Typography>
        }

    </Section>;
}

interface IRideDetailsState {
    ride: Ride | undefined;
    isLoading: boolean;
    error: Error | undefined;
}

const RideDetails: React.FC<RideDetailsProps> = ({ match }: RideDetailsProps) => {

    const [state, setState] = useState<IRideDetailsState>({
        ride: undefined,
        isLoading: true,
        error: undefined
    });

    useEffect(() => {
        const rideId = parseInt(match.params.rideId);
        const fetchRideDetails = async () => {
            try {
                const ride = await RideService.findById(rideId);
                setState(prev => ({ ...prev, ride: ride, isLoading: false }));
            } catch (error) {
                setState(prev => ({ ...prev, error: error, isLoading: false }));
            }
        };
        fetchRideDetails();
    }, [match.params.rideId]);

    const showArrival = (): boolean => state.ride?.arrival !== undefined;

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
        <StopSection title="Departure" divider stop={state.ride?.departure!!} />
        {showArrival() && <StopSection title="Arrival" stop={state.ride?.arrival!!} />}
        <Fab
            color="primary"
            aria-label="edit"
            className="ride-edit-button"
            onClick={() => {
                const rideId = match.params.rideId!!;
                window.location.href = `${window.location.origin}/rides/form/${rideId}`;
            }}
        >
            <EditIcon />
        </Fab>
    </Page>
};

export default withRouter(RideDetails);