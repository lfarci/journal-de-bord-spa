import React, { useState } from "react";
import { ResourcesService } from "../../../../services/ResourcesService";
import { Ride } from "../../../../types";
import { TrafficCondition } from "./fields";
import RideForm from "./RideForm";

const defaultRide: Ride = {
    departure: {
        moment: new Date(2021, 1, 1, 12, 0, 0),
        location: {
            id: 3,
            name: "Magasin",
            latitude: 23.45,
            longitude: 23.45
        },
        odometerValue: 10000
    },
    arrival: {
        moment: new Date(2021, 1, 1, 13, 0, 0),
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

interface IRideFormPageState {
    isLoading: boolean;
    error: Error | undefined;
}

function RideFormPage() {

    const [state, setState] = useState<IRideFormPageState>({
        isLoading: false,
        error: undefined
    });

    const setLoading = (value: boolean) => setState((prev) => ({...prev, isLoading: value }));

    return <RideForm
        ride={defaultRide}
        isDriving={false}
        isLoading={state.isLoading}
        error={state.error}
        onChange={() => { }}
        onSubmit={async (data: Ride) => {
            const resources = new ResourcesService();
            try {
                setLoading(true);
                await resources.postRide(data);
                setLoading(false);
            } catch (error) {
                setState((prev) => ({...prev, isLoading: false, error: error }))
            }
        }}
    />;
}

export default RideFormPage;