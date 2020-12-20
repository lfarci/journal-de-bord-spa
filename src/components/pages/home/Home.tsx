import React from "react";

import { ProgressOverviewCard } from "./overview";
import { Page } from "../../common";

import "./Home.scss";
import RideControlCard from "./control/RideControlCard";

function Home() {

	return <Page title="Home" selected="home" showBottomNavigation>
		<div className="home-cards">
			<ProgressOverviewCard
				className="home-progress-overview-card"
				currentDistance={0}
				distanceObjective={1500}
			/>
			<RideControlCard
				tracking={true}
				departureLocationName="WORK"
				trackingMilliseconds={ 3600000 * 24}
				onStartRide={() => console.log("Start a new ride")}
				onCancelRide={() => console.log("Cancel a new ride")}
				onFinishRide={() => console.log("Finish a new ride")}
			/>
		</div>
	</Page>;

}

export default Home;