import React, { useCallback, useState } from "react";

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
    userWelcomed: boolean;
}

function Home() {

    const [state, setState] = useState<IHomeState>({
        departure: undefined,
        tracking: false,
        isLoading: false,
        error: undefined,
        showDriverFormDialog: false,
        userWelcomed: false
    });

    const welcomeUser = useCallback(async (): Promise<void> => {
        if (!(await DriverService.hasCurrentUserADriver())) {
            console.log("Awww a stranger, let's create a new driver!");
            setState(prev => ({ ...prev, showDriverFormDialog: true }));
        }
    }, []);

    useEffect(() => {
        if (!state.userWelcomed) {
            welcomeUser();
            setState(prev => ({ ...prev, userWelcomed: true }));
        }
    }, [welcomeUser, state.userWelcomed]);

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