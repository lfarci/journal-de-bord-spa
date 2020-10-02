import React, { useState } from "react";
import { Ride } from "../../types/Ride";
import { Container } from "@material-ui/core";
import StartShortcutCard from "./cards/StartShortcutCard";
import FinishShortcutCard from "./cards/FinishShortcutCard";

function Home() {

	const [lastRide] = useState<Ride | null>(null);

	console.log("Rendering home:  " + window.location.pathname);

	const isDriving = () => lastRide != null && lastRide.arrival == null;

	return <>
		<Container>
			{!isDriving() && <StartShortcutCard />}
			{isDriving() && <FinishShortcutCard />}
		</Container>
	</>;
}

export default Home;