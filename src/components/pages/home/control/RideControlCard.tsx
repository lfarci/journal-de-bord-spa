import React from "react";
import { Card, CardActions } from "@material-ui/core";
import RideControlCardAction from "./RideControlCardAction";
import RideControlCardContent from "./RideControlCardContent";

import "./RideControlCard.scss";
import { Skeleton } from "@material-ui/lab";

interface IRideControlCardProps {
    tracking: boolean;
    departureLocationName: string;
    trackingMilliseconds: number;
    isLoading?: boolean;
    onStartRide?: () => void;
    onCancelRide?: () => void;
    onFinishRide?: () => void;
}

export function LoadingRideControlCardSkeleton(props: { title: string, description: string }) {
    return <>
        <Skeleton>
            <RideControlCardContent
                title={props.title}
                description={props.description}
            />
        </Skeleton>
    </>;
}

export default function RideControlCard(props: IRideControlCardProps) {

    // TODO: this should be extracted in external resources
    const startTitle = "Start a new ride";
    const startDescription = "Start tracking your ride. The tracked ride will be logged into your journal when you finish tracking.";
    const trackingDescription = "When you reach your destination you can finish tracking the ride. A new record will be created in your journal.";

    const isLoading = () => props.isLoading === undefined ? false : props.isLoading;
    const onStart = () => { if (props.onStartRide !== undefined) props.onStartRide() };
    const onCancel = () => { if (props.onCancelRide !== undefined) props.onCancelRide() };
    const onFinish = () => { if (props.onFinishRide !== undefined) props.onFinishRide() };

    return <Card elevation={12} className="home-control-card">
        {props.tracking
            ? <RideControlCardContent
                locationName={props.departureLocationName}
                trackingMilliseconds={props.trackingMilliseconds}
                description={trackingDescription}
                loading={isLoading()}
            />
            : <RideControlCardContent
                title={startTitle}
                description={startDescription}
                loading={isLoading()}
            />
        }
        <CardActions className="home-control-card-actions">
            {isLoading()
                ? <div className="home-control-card-buttons">
                    <Skeleton><RideControlCardAction text="Start tracking" /></Skeleton>
                </div>
                : <div className="home-control-card-buttons">
                    {!props.tracking && <RideControlCardAction text="Start tracking" onClick={onStart} />}
                    {props.tracking && <RideControlCardAction text="Cancel" onClick={onCancel} color="secondary" />}
                    {props.tracking && <RideControlCardAction text="Finish tracking" onClick={onFinish} />}
                </div>
            }
        </CardActions>
    </Card >;
}