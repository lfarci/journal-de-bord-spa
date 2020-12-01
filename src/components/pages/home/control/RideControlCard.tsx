import React from "react";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import RideControlCardAction from "./RideControlCardAction";

export interface IRideControlCardContentProps {
    /**
     * The title should be an invite to start a new ride or could include
     * information about the current ride.
     */
    title: string;
    /**
     * The description should explain the consequences of the different
     * available card actions.
     */
    description?: string;

}

function RideControlCardContent(props: IRideControlCardContentProps) {
    const hasDescription = (): boolean => props.description !== undefined;
    return <CardContent>
        <Typography variant="h6">{props.title}</Typography>
        {hasDescription() && <Typography variant="body1">{props.description}</Typography>}
    </CardContent>;
}

export default function RideControlCard() {

    const isTrackingRide = (): boolean => false;

    return <Card elevation={12}>
        <RideControlCardContent
            title="Start new a ride"
            description="Start tracking your ride. The tracked ride will be logged into your journal when you finish tracking."
        />
        <CardActions>
            {!isTrackingRide() && <RideControlCardAction text="Start tracking"/>}
            {isTrackingRide() && <RideControlCardAction text="Cancel tracking" color="secondary"/>}
            {isTrackingRide() && <RideControlCardAction text="Finish tracking"/>}
        </CardActions>
    </Card >;
}