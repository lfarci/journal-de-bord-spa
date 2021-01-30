import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ResourcesService } from "../../../../services/ResourcesService";
import { Ride } from "../../../../types";
import { Page } from "../../../common";
import RideForm from "./RideForm";

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

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const rideId = query.get("rideId");
        console.log("[Form should be rendering for]", rideId);

    });

    return <Page title="New ride" isLoading={state.isLoading} error={state.error}>
        <RideForm
            ride={undefined}
            isDriving={false}
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
        />
    </Page>;
}

export default RideFormPage;