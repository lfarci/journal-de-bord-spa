import React from "react";
import { Card, CardActions } from "@material-ui/core";
import RideControlCardAction from "./RideControlCardAction";
import RideControlCardContent from "./RideControlCardContent";

import "./RideControlCard.scss";
import { Skeleton } from "@material-ui/lab";
import { StartRideFormDialog } from "./dialogs";
import { useState } from "react";
import FinishRideFormDialog from "./dialogs/FinishRideFormDialog";
import { useEffect } from "react";
import RideService, { getLastRecentRide, isLastRideFinished } from "../../../../services/Rides";
import { useCallback } from "react";
import { RecentRide } from "../../../../types";

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

export default function RideControlCard(props: {}) {

    const [ initialized, setInitialized ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ lastRide, setLastRide ] = useState<RecentRide | undefined>(undefined);
    const [ tracking, setTracking ] = useState<boolean>(false);
    const [ showStartDialog, setShowStartDialog ] = useState<boolean>(false);
    const [ showFinishDialog, setShowFinishDialog ] = useState<boolean>(false);

    const startTitle = "Start a new ride";
    const startDescription = "Start tracking your ride. The tracked ride will be logged into your journal when you finish tracking.";
    const trackingDescription = "When you reach your destination you can finish tracking the ride. A new record will be created in your journal.";

    const onStart = () => { setShowStartDialog(true); };
    const onCancel = () => { cancelTracking(); };
    const onFinish = () => { setShowFinishDialog(true); };

    const cancelTracking = useCallback(async () => {
        setLoading(true);
        const lastRecentRide = await getLastRecentRide();
        if (lastRecentRide !== undefined) {
            await RideService.deleteById(lastRecentRide.id);
            setTracking(false);
        }
        setLoading(false);
    }, []);

    const handleStart = useCallback(async () => {
        const updatedLastRide = await getLastRecentRide();
        setLoading(true);
        if (lastRide && updatedLastRide && lastRide.id !== updatedLastRide.id) {
            setLastRide(updatedLastRide);
        }
        setTracking(true);
        setLoading(false)
        setShowStartDialog(false);
    }, [lastRide]);

    useEffect(() => {
        const initialize = async () => {
            setTracking(!await isLastRideFinished());
            setLastRide(await getLastRecentRide());
            setLoading(false);
            setInitialized(true);
        };
        if (!initialized) {
            initialize();
        }
        
    }, [initialized]);

    return <Card elevation={12} className="home-control-card">
        { tracking
            ? <RideControlCardContent
                locationName={lastRide ? lastRide.departureLocationName : "Unknown"}
                trackingMilliseconds={ 12222 }
                description={trackingDescription}
                loading={loading}
            />
            : <RideControlCardContent
                title={startTitle}
                description={startDescription}
                loading={loading}
            />
        }
        <CardActions className="home-control-card-actions">
            { loading
                ? <div className="home-control-card-buttons">
                    <Skeleton><RideControlCardAction text="Start tracking" /></Skeleton>
                </div>
                : <div className="home-control-card-buttons">
                    { !tracking && <RideControlCardAction text="Start tracking" onClick={onStart} /> }
                    { tracking && <RideControlCardAction text="Cancel" onClick={onCancel} color="secondary" /> }
                    { tracking && <RideControlCardAction text="Finish tracking" onClick={onFinish} /> }
                </div>
            }
        </CardActions>
        <StartRideFormDialog
            open={showStartDialog}
            onSubmit={ handleStart }
            onCancel={ () => setShowStartDialog(false) }
        />
        <FinishRideFormDialog
            open={showFinishDialog}
            onSubmit={ () => { 
                setShowFinishDialog(false);
                setTracking(false);
            }}
            onCancel={ () => setShowFinishDialog(false) }
        />
    </Card >;
}