import React, { useState } from "react";

import { ProgressOverviewCard } from "./overview";
import { Page } from "../../common";

import "./Home.scss";
import RideControlCard from "./control/RideControlCard";
import RecentRidesCard from "./rides/RecentRidesCard";
import { useEffect } from "react";
import { ResourcesService } from "../../../services/ResourcesService";
import { AuthService } from "../../../services/AuthService";
import { RecentRide } from "../../../types";
import { User } from "oidc-client";

interface IHomeState {
	recentRides: RecentRide[];
	isLoading: boolean;
	error: Error | undefined;
}

function Home() {

	const [state, setState] = useState<IHomeState>({
		recentRides: [],
		isLoading: true,
		error: undefined
	});

	useEffect(() => {
		const authService = new AuthService();
		const resources = new ResourcesService();
		const getRides = async () => {
			const user: User | null = await authService.getUser();
			if (user) {
				const rides = await resources.getRecentRides("uid", 3);
				setState((prev) => ({ ...prev, isLoading: false, recentRides: rides }));
			}
		}
		try {
			if (authService.isLoggedIn()) {
				getRides();
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
				tracking={true}
				departureLocationName="WORK"
				trackingMilliseconds={3600000 * 24}
				isLoading={state.isLoading}
				onStartRide={() => console.log("Start a new ride")}
				onCancelRide={() => console.log("Cancel a new ride")}
				onFinishRide={() => console.log("Finish a new ride")}
			/>
			<RecentRidesCard
				title="Recent rides"
				rides={state.recentRides}
				isLoading={state.isLoading}
			/>
		</div>
	</Page>;

}

export default Home;