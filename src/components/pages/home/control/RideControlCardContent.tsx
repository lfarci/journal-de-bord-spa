import React from "react";
import { CardContent, Typography } from "@material-ui/core";

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

export default function RideControlCardContent(props: IRideControlCardContentProps) {
    const hasDescription = (): boolean => props.description !== undefined;
    return <CardContent>
        <Typography variant="h6">{props.title}</Typography>
        {hasDescription() && <Typography variant="body1">{props.description}</Typography>}
    </CardContent>;
}