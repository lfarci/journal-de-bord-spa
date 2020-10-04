import React from "react";

import "./ProgressOverviewCard.scss";

import { Card, Container, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Progress from "./Progress";

interface IProgressOverviewCardProps {
	currentDistance: number;
	totalDistance: number;
}

function ProgressOverviewCard(props: {value: number}) {

	return <Card elevation={12} className="card">
		<CardContent>
			<Typography variant="h6" gutterBottom>Hi Logan,</Typography>
			<Container className="overview">
				<Progress value={props.value}/>
				<div className="legend">
					<Typography variant="body1">You have reached</Typography>
					<Typography variant="h6">123 km</Typography>
					<Typography variant="body1">of your 1500 km objective.</Typography>
				</div>
			</Container>
		</CardContent>
	</Card>;
}

export default ProgressOverviewCard;