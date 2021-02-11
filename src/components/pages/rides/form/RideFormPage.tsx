import { User } from "oidc-client";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { AuthService } from "../../../../services/AuthService";
import { RideService } from "../../../../services/local/RideService";
import { Ride } from "../../../../types";
import { Page } from "../../../common";
import RideForm from "./RideForm";

type RideFormPageParams = { rideId: string };

type RideFormPageProps = RouteComponentProps<RideFormPageParams>;

interface IRideFormPageState {
    ride: Ride | undefined;
    isLoading: boolean;
    error: Error | undefined;
}

function RideFormPage({ match }: RideFormPageProps) {

    const [state, setState] = useState<IRideFormPageState>({
        ride: undefined,
        isLoading: match.params.rideId !== undefined,
        error: undefined
    });

    const title = (): string => match.params.rideId ? "Edit the ride" : "Create a new ride";
    const rideId = (): number => parseInt(match.params.rideId);

    useEffect(() => {
        if (match.params.rideId) {
            const authService = new AuthService();
            const fetchRide = async () => {
                const user: User | null = await authService.getUser();
                if (user) {
                    const rideId = parseInt(match.params.rideId);
                    const ride = await RideService.findById(rideId);
                    setState(prev => ({ ...prev, ride: ride, isLoading: false, error: undefined}));
                }
            };
            try {
                if (authService.isLoggedIn()) fetchRide();
            } catch (error) {
                setState(prev => ({ ...prev, isLoading: false, error: error}));
            }
        }
    }, [match.params.rideId]);

    return <Page title={title()} isLoading={state.isLoading} error={state.error}>
        <RideForm
            ride={state.ride}
            isDriving={false}
            onChange={() => { }}
            onSubmit={async (data: Ride) => {
                console.log("[SUBMITTED]", JSON.stringify(data, null, 2));
                if (data.id && data.id !== rideId()) {
                    // error
                }
                try {
                    setState(prev => ({...prev, isLoading: true, error: undefined}));
                    const rideId = await RideService.put(data);
                    window.location.href = `${window.location.origin}/rides/${rideId}`;
                } catch(error) {
                    setState(prev => ({...prev, isLoading: false, error: error}));
                }
            }}
        />
    </Page>;
}

export default RideFormPage;