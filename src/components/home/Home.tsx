import React, { useState } from "react";
import { Ride } from "../../types/Ride";
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import StartShortcutCard from "./cards/StartShortcutCard";
import FinishShortcutCard from "./cards/FinishShortcutCard";
import ProgressOverviewCard from "./overview/ProgressOverviewCard";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: "1em"
		}
	}),
);

function Home() {

	const classes = useStyles();

	const [lastRide] = useState<Ride | null>(null);

	const isDriving = () => lastRide != null && lastRide.arrival == null;

	return <Container className={classes.root}>
		<ProgressOverviewCard value={60} />
		{!isDriving() && <StartShortcutCard />}
		{isDriving() && <FinishShortcutCard />}
	</Container>;
}

export default Home;