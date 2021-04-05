import React from "react";
import { Typography } from "@material-ui/core";
import { RecentRide } from "../../../../types";
import RecentRideListItem from "./RecentRideListItem";

interface IRecentRidesProps {
    rides: RecentRide[];
}

const RecentRides = (props: IRecentRidesProps) => {

    const empty = (): boolean => props.rides.length === 0;

    return <div data-testid="recent-rides-list">
        {empty()
            ?
            <Typography variant="body1" className="home-rides-card-empty">
                You have no rides.
            </Typography>
            :
            props.rides.map((ride, index) => <RecentRideListItem key={index} ride={ride} />)
        }
    </div>;
}

export default RecentRides;
