import { Typography } from "@material-ui/core";
import React from "react";
import { IRecentRide } from "./RecentRidesCard";

export default function RecentRideListItem(props: {ride: IRecentRide}) {
    return <div>
        <div className="recent-ride-list-item-start">
            <Typography variant="body1">Home to work</Typography>
            <Typography variant="body2">2 hours ago</Typography>
        </div>
        <div className="recent-ride-list-item-end">
            23 km
        </div>
    </div>;
}