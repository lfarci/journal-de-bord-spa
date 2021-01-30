import React, { useState } from "react";

import { ProgressOverviewCard } from "./overview";
import { Page } from "../../common";

import "./Home.scss";
import RideControlCard from "./control/RideControlCard";
import RecentRidesCard from "./rides/RecentRidesCard";
import { useEffect } from "react";
import { ResourcesService } from "../../../services/ResourcesService";
import { AuthService } from "../../../services/AuthService";
import { RecentRide, Location, Stop } from "../../../types";
import { User } from "oidc-client";
import { StartRideFormDialog } from "./control/dialogs";

interface IHomeState {
	recentRides: RecentRide[];
	locations: Location[];
	departure: Stop | undefined;
	tracking: boolean;
	isLoading: boolean;
	error: Error | undefined;
	showNewRideFormDialog: boolean;
}

function Home() {

	const [state, setState] = useState<IHomeState>({
		recentRides: [],
		locations: [],
		departure: undefined,
		tracking: false,
		isLoading: true,
		error: undefined,
		showNewRideFormDialog: false,
	});

	useEffect(() => {
		const authService = new AuthService();
		const resources = new ResourcesService();
		const getResources = async () => {
			const user: User | null = await authService.getUser();
			if (user) {
				let tracking = await resources.isTracking(user?.profile.sub);
				const locations = await resources.getLocations(user?.profile.sub);
				const rides = await resources.getRecentRides(user?.profile.sub, 3);

				if (state.departure) {
					await resources.startRide(user.profile.sub, state.departure);
					tracking = await resources.isTracking(user?.profile.sub);
				}

				setState((prev) => ({ ...prev, isLoading: false, recentRides: rides, locations: locations, departure: undefined, tracking: tracking }));
			}
		}
		try {
			if (authService.isLoggedIn()) {
				getResources();
			}
		} catch (error) {
			setState((prev) => ({ ...prev, isLoading: false, error: error }));
		}
	}, [state.departure]);

	return <Page title="Home" selected="home" error={state.error} showBottomNavigation>
		<div className="home-cards">
			<ProgressOverviewCard
				className="home-progress-overview-card"
				currentDistance={0}
				distanceObjective={1500}
			/>
			<RideControlCard
				tracking={state.tracking}
				departureLocationName={state.departure?.location.name!!}
				trackingMilliseconds={3600000 * 24}
				isLoading={state.isLoading}
				onStartRide={() => setState((prev) => ({ ...prev, showNewRideFormDialog: true }))}
				onCancelRide={() => console.log("Cancel a new ride")}
				onFinishRide={() => console.log("Finish a new ride")}
			/>
			<RecentRidesCard
				title="Recent rides"
				rides={state.recentRides}
				isLoading={state.isLoading}
			/>
		</div>
		<StartRideFormDialog 
			open={state.showNewRideFormDialog}
			locations={state.locations}
			onSubmit={async (data: Stop) => {
				setState((prev) => ({
					...prev,
					isLoading: true,
					departure: data,
					showNewRideFormDialog: false
				}));
			}}
			onCancel={() => setState((prev) => ({ ...prev, showNewRideFormDialog: false }))}
		/>
	</Page>;

}

export default Home;