import React from "react";

import { ProgressOverviewCard } from "./overview";
import { Page } from "../../common";

import "./Home.scss";

function Home() {

	return <Page title="Home" selected="home" showBottomNavigation>
		<div className="home-cards">
			<ProgressOverviewCard
				className="home-progress-overview-card"
				currentDistance={0}
				distanceObjective={1500}
			/>
		</div>
	</Page>;

}

export default Home;