import React from "react";
import { Card, CardActions } from "@material-ui/core";
import RideControlCardAction from "./RideControlCardAction";
import RideControlCardContent from "./RideControlCardContent";

import "./RideControlCard.scss";

interface IRideControlCardProps {
    tracking: boolean;
    departureLocationName: string;
    trackingMilliseconds: number;
    onStartRide?: () => void;
    onCancelRide?: () => void;
    onFinishRide?: () => void;
}

export default function RideControlCard(props: IRideControlCardProps) {

    // TODO: this should be extracted in external resources
    const startTitle = "Start a new ride";
    const startDescription = "Start tracking your ride. The tracked ride will be logged into your journal when you finish tracking.";
    const trackingDescription = "When you reach your destination you can finish tracking the ride. A new record will be created in your journal.";

    const onStart = () => props.onStartRide === undefined ? () => {} : props.onStartRide;
    const onCancel = () => props.onCancelRide === undefined ? () => {} : props.onCancelRide;
    const onFinish = () => props.onFinishRide === undefined ? () => {} : props.onFinishRide;

    return <Card elevation={12} className="home-control-card">
        {props.tracking
            ? <RideControlCardContent
                locationName={props.departureLocationName}
                trackingMilliseconds={props.trackingMilliseconds}
                description={trackingDescription}
            />
            : <RideControlCardContent
                title={startTitle}
                description={startDescription}
            />
        }
        <CardActions className="home-control-card-actions">
            {!props.tracking && <RideControlCardAction text="Start tracking" onClick={onStart} />}
            {props.tracking && <RideControlCardAction text="Cancel" onClick={onCancel} color="secondary" />}
            {props.tracking && <RideControlCardAction text="Finish tracking" onClick={onFinish} />}
        </CardActions>
    </Card >;
}