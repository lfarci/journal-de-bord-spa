import { Divider, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { RecentRide } from "../../../../types";

const humanizeDuration = require("humanize-duration");

function toHumanReadableDuration(milliseconds: number): string {
    // Options description are available here: https://www.npmjs.com/package/humanize-duration
    // Note: negative are ignored
    return humanizeDuration(milliseconds, {
        round: true,
        units: ['y', 'mo', 'd', 'h', 'm'],
        largest: 1,
    });
}

function getPassedTimeSince(date: Date): number {
    return Date.now() - date.getTime();
}

function getAgoText(ride: RecentRide) {
    const duration: number = getPassedTimeSince(ride.date);
    return `${toHumanReadableDuration(duration)} ago`;
}

export default function RecentRideListItem(props: { ride: RecentRide }) {

	const history = useHistory();

    return <div className="recent-ride-list-item" onClick={() => history.push(`rides/${props.ride.id}`)}>
        <div className="recent-ride-list-item-content">
            <div className="recent-ride-list-item-start">
                <Typography variant="body1">
                    {props.ride.departureLocationName} to {props.ride.arrivalLocationName}
                </Typography>
                <Typography variant="body2">{getAgoText(props.ride)}</Typography>
            </div>
            <div className="recent-ride-list-item-end">
                <Typography variant="h6">{props.ride.distance} km</Typography>
            </div>
        </div>
        <Divider />
    </div>;
}