import React, { useState } from "react";

import { ProgressOverviewCard } from "./overview";
import { Page } from "../../common";

import "./Home.scss";
import RideControlCard from "./control/RideControlCard";
import RecentRidesCard from "./rides/RecentRidesCard";
import { useEffect } from "react";
import { ResourcesService } from "../../../services/ResourcesService";
import { AuthService } from "../../../services/AuthService";
import { RecentRide, Location } from "../../../types";
import { User } from "oidc-client";
import { StartRideFormDialog } from "./control/dialogs";

interface IHomeState {
	recentRides: RecentRide[];
	locations: Location[];
	isLoading: boolean;
	error: Error | undefined;
	showNewRideFormDialog: boolean;
}

function Home() {

	const [openNewRideForm, showNewRideForm] = useState<boolean>(false);
	const [state, setState] = useState<IHomeState>({
		recentRides: [],
		locations: [],
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
				const locations = await resources.getLocations(user?.profile.sub);
				const rides = await resources.getRecentRides(user?.profile.sub, 3);
				setState((prev) => ({ ...prev, isLoading: false, recentRides: rides, locations: locations }));
			}
		}
		try {
			if (authService.isLoggedIn()) {
				getResources();
			}
		} catch (error) {
			setState((prev) => ({ ...prev, isLoading: false, error: error }));
		}
	}, []);

	return <Page title="Home" selected="home" error={state.error} showBottomNavigation>
		<div className="home-cards">
			<ProgressOverviewCard
				className="home-progress-overview-card"
				currentDistance={0}
				distanceObjective={1500}
			/>
			<RideControlCard
				tracking={false}
				departureLocationName="WORK"
				trackingMilliseconds={3600000 * 24}
				isLoading={state.isLoading}
				onStartRide={() => showNewRideForm(true)}
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
			open={openNewRideForm}
			locations={state.locations}
			onSubmit={(data: any) => {
				console.log(data);
				showNewRideForm(false);
			}}
			onCancel={() => showNewRideForm(false)}
		/>
	</Page>;

}

export default Home;