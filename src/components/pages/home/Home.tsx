import React, { useState } from "react";
import { Ride } from "../../../types/Ride";
import StartShortcutCard from "./cards/StartShortcutCard";
import FinishShortcutCard from "./cards/FinishShortcutCard";

import { ProgressOverviewCard } from "./overview";
import { Page } from "../../common";

import "./Home.scss";

function Home() {

	const [lastRide] = useState<Ride | null>(null);

	const isDriving = () => lastRide != null && lastRide.arrival == null;

	return <Page title="Home" selected="home">
		<div className="home-cards">
			<ProgressOverviewCard username="Logan" currentDistance={456} distanceObjective={1500} />
			{!isDriving() && <StartShortcutCard />}
			{isDriving() && <FinishShortcutCard />}
		</div>
	</Page>;

}

export default Home;