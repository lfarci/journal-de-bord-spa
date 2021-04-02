import React from "react";
import { Card, Typography } from "@material-ui/core";
import RecentRideListItem from "./RecentRideListItem";

import "./RecentRidesCard.scss";
import { Skeleton } from "@material-ui/lab";
import { RecentRide } from "../../../../types";

interface IRecentRidesCardProps {
    title: string;
    rides: RecentRide[];
    isLoading?: boolean;
}

export default function RecentRidesCard(props: IRecentRidesCardProps) {

    const isLoading = () => props.isLoading === undefined ? false : props.isLoading;
    const isEmpty = (): boolean => props.rides.length === 0;

    return <Card elevation={12} className="home-rides-card">
        <Typography className="home-rides-card-title" variant="h6">
            {isLoading() ? <Skeleton /> : "Recent rides"}
        </Typography>
        {
            isEmpty()
                ? <Typography variant="body1" className="home-rides-card-empty">
                    {isLoading() ? <Skeleton /> : "Your journal is currently empty"}
                </Typography>
                : props.rides.map((ride, index) => <RecentRideListItem key={index} ride={ride} />)
        }
    </Card >;
}