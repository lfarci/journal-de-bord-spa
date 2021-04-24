import React, { useState } from "react";

import { ProgressOverviewCard } from "./overview";
import { Page } from "../../common";

import "./Home.scss";
import RideControlCard from "./control/RideControlCard";
import RecentRidesCard from "./rides/RecentRidesCard";
import { useEffect } from "react";
import { AuthService } from "../../../services/AuthService";
import { Stop, Driver } from "../../../types";
import DriverService from "../../../services/DriverService";
import DriverFormDialog from "./DriverFormDialog";

interface IHomeState {
    departure: Stop | undefined;
    tracking: boolean;
    isLoading: boolean;
    error: Error | undefined;
    showDriverFormDialog: boolean;
}

function Home() {

    const [state, setState] = useState<IHomeState>({
        departure: undefined,
        tracking: false,
        isLoading: false,
        error: undefined,
        showDriverFormDialog: false,
    });

    useEffect(() => {
        const getResources = async () => {
            try {
                if (state.departure) {
                    console.log("Ready to start your ride!");
                }
            } catch (error) {
                setState(prev => ({ ...prev, isLoading: false, error: error }));
            }
        }
        getResources();
    }, [state.departure]);

    return <Page title="Home" selected="home" error={state.error} isLoading={state.isLoading} showBottomNavigation>
        <div className="home-cards">
            <ProgressOverviewCard />
            <RideControlCard
                tracking={state.tracking}
                departureLocationName={state.departure?.location.name!!}
                trackingMilliseconds={3600000 * 24}
                isLoading={state.isLoading}
                onCancelRide={() => console.log("Cancel a new ride")}
                onFinishRide={() => console.log("Finish a new ride")}
            />
            <RecentRidesCard title="Recent rides" size={5} />
        </div>
        <DriverFormDialog
            open={state.showDriverFormDialog}
            onSubmit={async (data: Driver) => {
                try {
                    setState(prev => ({ ...prev, isLoading: true, showDriverFormDialog: false }));
                    await DriverService.create(data);
                    setState(prev => ({ ...prev, isLoading: false }));
                } catch (error) {
                    setState(prev => ({ ...prev, isLoading: false, error: error }));
                }
            }}
            onCancel={() => new AuthService().logout()}
        />
    </Page>;

}

export default Home;