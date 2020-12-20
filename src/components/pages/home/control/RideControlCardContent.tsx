import React from "react";
import { CardContent, Typography } from "@material-ui/core";
import RideControlCardTitle from "./RideControlCardTitle";
import { Skeleton } from "@material-ui/lab";

export interface IBaseContentProps {
    title: string | undefined;
}

export interface ITrackingContentProps {
    locationName?: string;
    trackingMilliseconds: number;
}

type IRideControlCardContentProps = (IBaseContentProps | ITrackingContentProps) & { description?: string, loading?: boolean };

export default function RideControlCardContent(props: IRideControlCardContentProps) {

    const hasTitle = () => "title" in props;
    const hasLocationName = () => "locationName" in props;
    const hasDuration = () => "trackingMilliseconds" in props;
    const computeTitle = () => hasLocationName() && hasDuration();

    const isLoading = () => props.loading === undefined ? false : props.loading;
    const specifiedDescription = () => props.description !== undefined;
    const emptyDescription = () => props.description?.length === 0;
    const hasDescription = (): boolean => specifiedDescription() && !emptyDescription();

    return <CardContent>
        {isLoading()
            ? <Typography variant="h6">{isLoading() ? <Skeleton /> : "h6"}</Typography>
            : <div>
                {hasTitle() && <RideControlCardTitle text={(props as IBaseContentProps).title} />}
                {computeTitle() && <RideControlCardTitle
                    locationName={(props as ITrackingContentProps).locationName}
                    trackingMilliseconds={(props as ITrackingContentProps).trackingMilliseconds}
                />
                }
            </div>
        }
        {hasDescription() && <Typography variant="body1">
            {isLoading() ? <Skeleton /> : props.description}
        </Typography>}
    </CardContent>;
}