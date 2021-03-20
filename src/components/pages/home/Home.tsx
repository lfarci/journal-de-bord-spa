import React, { useState } from "react";

import { ProgressOverviewCard } from "./overview";
import { Page } from "../../common";

import "./Home.scss";
import RideControlCard from "./control/RideControlCard";
import RecentRidesCard from "./rides/RecentRidesCard";
import { useEffect } from "react";
import { ResourcesService } from "../../../services/ResourcesService";
import { AuthService } from "../../../services/AuthService";
import { RecentRide, Location, Stop, Driver } from "../../../types";
import { User } from "oidc-client";
import { StartRideFormDialog } from "./control/dialogs";
import LocationService from "../../../services/LocationService";
import RideService from "../../../services/RideService";
import DriverService from "../../../services/DriverService";
import DriverFormDialog from "./DriverFormDialog";

interface IHomeState {
	recentRides: RecentRide[];
	locations: Location[];
	departure: Stop | undefined;
	tracking: boolean;
	isLoading: boolean;
	error: Error | undefined;
	showNewRideFormDialog: boolean;
	showDriverFormDialog: boolean;
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
		showDriverFormDialog: false,
	});

	useEffect(() => {
		const getResources = async () => {
				try {
					const driver = await DriverService.getCurrentDriver();

					if (driver) {
						console.log("The driver already exist and is ready to be used");
					} else {
						// create new driver
						setState(prev => ({ ...prev, isLoading: false, showDriverFormDialog: true}));
					}


				if (state.departure) {
					console.log("Ready to start your ride!");
				}

			} catch (error) {
				setState(prev => ({ ...prev, isLoading: false, error: error }));
			}
		}
		getResources();
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
		<DriverFormDialog
			open={state.showDriverFormDialog}
			onSubmit={async (data: Driver) => {
				console.log(JSON.stringify(data, null, 2));
				try {
					setState(prev => ({ ...prev, isLoading: true }));
					await DriverService.create(data);
					setState(prev => ({ ...prev, isLoading: false }));
				} catch (error) {
					setState(prev => ({ ...prev, isLoading: false, error: error}));
				}
			}}
			onCancel={ () => new AuthService().logout() }
		/>
	</Page>;

}

export default Home;