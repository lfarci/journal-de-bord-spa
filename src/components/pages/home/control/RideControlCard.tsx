import React from "react";
import { Card, CardActions,  } from "@material-ui/core";
import RideControlCardAction from "./RideControlCardAction";
import RideControlCardContent from "./RideControlCardContent";

const humanizeDuration = require("humanize-duration");

interface IRideControlCardProps {
    tracking: boolean;
    departureLocationName: string;
    trackingMilliseconds: number;
    onStartRide: () => void;
    onCancelRide: () => void;
    onFinishRide: () => void;
}

export function getTrackingTitle(locationName: string, trackingMilliseconds: number) {
    const name = locationName.toLowerCase();
    // Options description are available here: https://www.npmjs.com/package/humanize-duration
    const duration = humanizeDuration(trackingMilliseconds, {
        round: true,
        units: ['d', 'h', 'm'],
        largest: 1,
    });
    return `You left ${name} ${duration} ago`;
}

export default function RideControlCard(props: IRideControlCardProps) {

    // TODO: this should be extracted in external resources
    const startTitle = "Start a new ride";
    const startDescription = "Start tracking your ride. The tracked ride will be logged into your journal when you finish tracking.";
    const trackingTitle = getTrackingTitle(props.departureLocationName, props.trackingMilliseconds);
    const trackingDescription = "When you reach your destination you can finish tracking the ride. A new record will be created in your journal.";

    const getTitle = () => props.tracking ? trackingTitle : startTitle;
    const getDescription = () => props.tracking ? trackingDescription : startDescription;

    return <Card elevation={12}>
        <RideControlCardContent
            title={getTitle()}
            description={getDescription()}
        />
        <CardActions>
            {!props.tracking && <RideControlCardAction text="Start tracking" onClick={props.onStartRide}/>}
            {props.tracking && <RideControlCardAction text="Cancel" onClick={props.onCancelRide} color="secondary"/>}
            {props.tracking && <RideControlCardAction text="Finish tracking" onClick={props.onFinishRide}/>}
        </CardActions>
    </Card >;
}