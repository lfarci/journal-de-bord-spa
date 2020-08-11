import React from "react";
import { Typography, Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import RideListItem from "./list/RideListItem";
import { Ride } from "../../types";
import { TrafficCondition } from "./fields";

const moment = require("moment");

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 10,
        },
    })
);

const model: Ride = {
    departure: {
        moment: new Date(),
        location: {
            id: 3,
            name: "Magasin",
            latitude: 23.45,
            longitude: 23.45
        },
        odometerValue: 10000
    },
    arrival: {
        moment: new Date(),
        location: {
            id: 4,
            name: "Maison",
            latitude: 25,
            longitude: 26
        },
        odometerValue: 12000
    },
    driverPseudonym: undefined,
    trafficCondition: TrafficCondition.NORMAL,
    comment: "Je suis un brave."
};

const rides: Ride[] = [0, 1, 2, 3, 4, 5, 6].map(e => model);

function Rides(props: {}) {

    const classes = useStyles();

    const getDistance = (ride: Ride) => {
        if (ride.arrival == null) throw new RangeError();
        return ride.arrival?.odometerValue - ride.departure.odometerValue;
    }

    const getDuration = (ride: Ride): number => {
        if (ride.arrival == null) throw new RangeError();
        const departureDate = moment(ride.departure.moment);
        const arrivalDate = moment(ride.arrival.moment);
        const duration = moment.duration(departureDate.diff(arrivalDate));
        return duration.asMilliseconds();
    }

    return (
        <Container>
            {
                rides.map((ride: Ride) => <RideListItem
                    className={classes.root}
                    departureLocationName={ride.departure.location.name}
                    arrivalLocationName={ride.arrival!!.location.name}
                    date={ride.departure.moment}
                    trafficCondition={ride.trafficCondition}
                    distance={getDistance(ride)}
                    duration={getDuration(ride)}
                />)
            }

        </Container>
    );
}

export default Rides;