import React, { useState } from "react";
import { Ride } from "../../types/Ride";
import RideForm from "../rides/form/RideForm";
import { TrafficCondition } from "../rides/form/fields";
import { Typography, Card, Button, Container, CardContent, CardActions, makeStyles, createStyles, Theme } from "@material-ui/core";
import StartShortcutCard from "./cards/StartShortcutCard";
import FinishShortcutCard from "./cards/FinishShortcutCard";

function Home(props: {}) {

	const [lastRide, setLastRide] = useState<Ride | null>(null);

	const isDriving = () => lastRide != null && lastRide.arrival == null;

	return <>
		<Container>
			{!isDriving() && <StartShortcutCard />}
			{isDriving() && <FinishShortcutCard />}
		</Container>
	</>;
}

export default Home;