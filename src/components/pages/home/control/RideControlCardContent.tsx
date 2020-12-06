import React from "react";
import { CardContent, Typography } from "@material-ui/core";
import RideControlCardTitle from "./RideControlCardTitle";

export interface IBaseContentProps {
    title: string | undefined;
}

export interface ITrackingContentProps {
    locationName?: string;
    trackingMilliseconds: number;
}

type IRideControlCardContentProps = (IBaseContentProps | ITrackingContentProps) & { description?: string };

export default function RideControlCardContent(props: IRideControlCardContentProps) {

    const hasTitle = () => "title" in props;
    const hasLocationName = () => "locationName" in props;
    const hasDuration = () => "trackingMilliseconds" in props;
    const computeTitle = () => hasLocationName() && hasDuration();

    const specifiedDescription = () => props.description !== undefined;
    const emptyDescription = () => props.description?.length === 0;
    const hasDescription = (): boolean => specifiedDescription() && !emptyDescription();

    return <CardContent>
        {hasTitle() && <RideControlCardTitle text={(props as IBaseContentProps).title} />}
        {computeTitle() && <RideControlCardTitle
            locationName={(props as ITrackingContentProps).locationName}
            trackingMilliseconds={(props as ITrackingContentProps).trackingMilliseconds}
        />
        }
        { hasDescription() && <Typography variant="body1">{props.description}</Typography> }
    </CardContent>;
}