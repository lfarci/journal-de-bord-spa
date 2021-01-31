import React, { useEffect, useState } from "react";
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
                console.log("[SUBMITTED]", JSON.stringify(data, null, 2));
            }}
        />
    </Page>;
}

export default RideFormPage;