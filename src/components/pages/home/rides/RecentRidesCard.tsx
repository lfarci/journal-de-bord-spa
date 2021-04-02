import React, { useCallback } from "react";
import { Card, Typography } from "@material-ui/core";

import "./RecentRidesCard.scss";
import { Skeleton } from "@material-ui/lab";
import { RecentRide } from "../../../../types";
import { useEffect } from "react";
import { useState } from "react";
import RideService from "../../../../services/RideService";
import RecentRides from "./RecentRides";

interface IRecentRidesCardState {
    isLoading: boolean;
    error: Error | undefined;
    initialized: boolean;
    rides: RecentRide[];
}

interface IRecentRidesCardProps {
    title: string;
    size?: number;
}

const RecentRidesCard = (props: IRecentRidesCardProps) => {

    const CARD_EVELATION = 12;
    const RECENT_RIDE_SKELETON_HEIGHT = 50;
    const DEFAULT_SIZE = 5;

    const [state, setState] = useState<IRecentRidesCardState>({
        isLoading: true,
        error: undefined,
        initialized: false,
        rides: []
    });

    const { size: requestedSize } = { ...props }
    const loading = (): boolean => state.isLoading;
    const error = (): boolean => !loading() && state.error !== undefined;
    const success = (): boolean => !error() && !loading();

    const fetchRecentRides = useCallback(async () => {
        try {
            if (!state.initialized) {
                const size = requestedSize === undefined ? DEFAULT_SIZE : requestedSize;
                const rides = await RideService.getRecentRides(size);
                setState(prev => ({ ...prev, rides: rides, isLoading: false, initialized: true }));
            }
        } catch (error) {
            setState(prev => ({ ...prev, error: error, isLoading: false }));
        }
    }, [state.initialized, requestedSize]);

    useEffect(() => {
        fetchRecentRides();
    }, [fetchRecentRides]);

    return <Card elevation={CARD_EVELATION} className="home-rides-card">
        <Typography className="home-rides-card-title" variant="h6">{props.title}</Typography>
        {loading() && [...Array(requestedSize)].map(e => 
            <Skeleton className="recent-ride-skeleton" height={RECENT_RIDE_SKELETON_HEIGHT} variant="rect"/>
        )}
        {error() && <Typography variant="body1" className="home-rides-card-empty">
            An error occured while loading your recent rides. Try reloading the page.
        </Typography>}
        { success() && <RecentRides rides={state.rides} />}
    </Card >;
}

export default RecentRidesCard;