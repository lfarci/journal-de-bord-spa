import React, { useCallback } from "react";
import { Card, Typography } from "@material-ui/core";

import "./RecentRidesCard.scss";
import { Skeleton } from "@material-ui/lab";
import { RecentRide } from "../../../../types";
import { useEffect } from "react";
import { useState } from "react";
import RecentRides from "./RecentRides";
import { getRecentRides } from "../../../../services/RideService";

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

export const RecentRidesSkeleton = (props: { size: number } = { size: 5 }) => {

    const RECENT_RIDE_SKELETON_HEIGHT = 50;

    return <div>
        {[...Array(props.size)].map((_, i) =>
            <Skeleton
                key={i}
                className="recent-ride-skeleton"
                height={RECENT_RIDE_SKELETON_HEIGHT}
                variant="rect"
        />)}
    </div>
}

const RecentRidesCard = (props: IRecentRidesCardProps) => {

    const CARD_EVELATION = 12;
    const DEFAULT_SIZE = 5;

    const [state, setState] = useState<IRecentRidesCardState>({
        isLoading: true,
        error: undefined,
        initialized: false,
        rides: []
    });

    const { size: requestedSize } = { ...props }

    const size = useCallback(() => requestedSize === undefined ? DEFAULT_SIZE : requestedSize, [requestedSize]);
    const loading = (): boolean => state.isLoading;
    const error = (): boolean => !loading() && state.error !== undefined;
    const success = (): boolean => !error() && !loading();

    const fetchRecentRides = useCallback(async () => {
        try {
            if (!state.initialized) {
                const rides = await getRecentRides(size());
                setState(prev => ({ ...prev, rides: rides, isLoading: false, initialized: true }));
            }
        } catch (error) {
            setState(prev => ({ ...prev, error: error, isLoading: false }));
        }
    }, [state.initialized, size]);

    useEffect(() => {
        fetchRecentRides();
    }, [fetchRecentRides]);

    return <Card elevation={CARD_EVELATION} className="home-rides-card">
        <Typography className="home-rides-card-title" variant="h6">{props.title}</Typography>
        {loading() && <RecentRidesSkeleton size={size()} />}
        {success() && <RecentRides rides={state.rides} />}
        {error() && <Typography variant="body1" className="home-rides-card-error">
            An error occured while loading your recent rides. Try reloading the page.
        </Typography>}
    </Card >;
}

export default RecentRidesCard;