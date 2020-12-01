import React from "react";
import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { StringLiteral } from "typescript";

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

export interface IRideControlCardActionProps {
    text: string;
    color?: "primary" | "secondary";
    onClick?: () => void;
}

function RideControlCardContent(props: IRideControlCardContentProps) {
    const hasDescription = (): boolean => props.description !== undefined;
    return <CardContent>
        <Typography variant="h6">{props.title}</Typography>
        {hasDescription() && <Typography variant="body1">{props.description}</Typography>}
    </CardContent>;
}

function RideControlCardAction(props: IRideControlCardActionProps) {
    const getColor = () => props.color === undefined ? "primary" : props.color;
    const getAction = () => props.onClick === undefined ? () => {} : props.onClick;
    return <Button
        size="medium"
        variant="contained"
        color={getColor()}
        onClick={getAction()}
    >
        {props.text}
    </Button>;
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