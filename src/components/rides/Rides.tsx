import React, { useState } from "react";
import RideForm from "./form/RideForm";
import { Ride } from "../../types/Ride";
import { TrafficCondition } from "./fields";
import { Typography, Container } from "@material-ui/core";

/**
 * Starts a new ride.
 *
 * @param ride is the new ride.
 */
function startANewRide(ride: Ride) {
    console.log("[DEBUG] Starting a new ride.");
}

/**
 * Should call the backend and finish the last started ride.
 *
 * @param ride is the ride that is finished.
 */
function finishLastRide(ride: Ride) {
    console.log("[DEBUG] Finishing the last ride");
}

// temporary this is mocking fetching from the api
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

function Rides(props: {}) {

    const [driving, setDriving] = useState(true);

    return (
        <Container>
            <Typography variant="body1">About to show the rides.</Typography>
        </Container>
    );
}

export default Rides;