import React, { useState } from "react";
import { Ride } from "../../types/Ride";
import RideForm from "../rides/form/RideForm";
import { TrafficCondition } from "../rides/form/fields";

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

function Home(props: {}) {

    const [driving, setDriving] = useState(true);

    return (
        <RideForm
            ride={model}
            isDriving={driving}
            onChange={(ride: Ride) => { }}
            onSubmit={(ride: Ride) => {
                if (driving) {
                    finishLastRide(ride);
                    setDriving(false);
                } else {
                    startANewRide(ride);
                    setDriving(true);
                }
                console.log(JSON.stringify(ride, null, 2));
            }}
        />
    );
}

export default Home;