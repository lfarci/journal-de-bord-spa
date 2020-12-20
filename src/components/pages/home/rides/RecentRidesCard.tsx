import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import RecentRideListItem from "./RecentRideListItem";

import "./RecentRidesCard.scss";

export interface IRecentRide {
    id: number;
    departureLocationName: string;
    arrivalLocationName: string;
    distance: number;
    date: Date;
}

interface IRecentRidesCardProps {
    title: string;
    rides: IRecentRide[];
}

export default function RecentRidesCard(props: IRecentRidesCardProps) {

    const isEmpty = (): boolean => props.rides.length === 0;

    return <Card elevation={12} className="home-rides-card">
        <CardContent>
            <Typography variant="h6">Recent rides</Typography>
            {
                isEmpty()
                    ? <p>No recent rides, start tracking!</p>
                    :  props.rides.map((ride, index) => <RecentRideListItem key={index} ride={ride} />)
            }
        </CardContent>
    </Card >;
}