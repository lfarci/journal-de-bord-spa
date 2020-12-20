import React from "react";
import { Card, CardContent } from "@material-ui/core";
import RecentRideListItem from "./RecentRideListItem";

export interface IRecentRide {
    id: number;
    departureLocationName: string;
    arrivalLocationName: string;
    distance: number;
    date: Date;
}

interface IRecentRidesCardProps {
    title: string;
    top?: number;
    rides: IRecentRide[];
}

export default function RecentRidesCard(props: IRecentRidesCardProps) {

    const isEmpty = (): boolean => props.rides.length === 0;

    return <Card elevation={12} className="home-rides-card">
        <CardContent>
            {
                isEmpty()
                    ? <p>No recent rides, start tracking!</p>
                    :  props.rides.map(ride => <RecentRideListItem ride={ride} />)
            }
        </CardContent>
    </Card >;
}