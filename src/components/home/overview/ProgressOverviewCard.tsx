import React from "react";

import "./ProgressOverviewCard.scss";

import { Card, Container, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Progress from "./Progress";

interface IProgressOverviewCardProps {
	/**
	 * Is the name of the current user.
	 */
	username: string;
	/**
	 * Is the total distance that the learner driver has reached.
	 */
	currentDistance: number;
	/**
	 * Is the distance that the learned driver wants to reach.
	 */
	distanceObjective: number;
}

/**
 * Cards that gives an overview of the current user progress.
 */
function ProgressOverviewCard(props: IProgressOverviewCardProps) {

	const percentage: number = (props.currentDistance / props.distanceObjective * 100);

	return <Card elevation={12} className="card">
		<CardContent>
			<Typography variant="h6" gutterBottom>Hi {props.username},</Typography>
			<Container className="column-centered overview">
				<Progress value={percentage}/>
				<div className="column-centered legend">
					<Typography variant="body1">You have reached</Typography>
					<Typography variant="h6">{props.currentDistance} km</Typography>
					<Typography variant="body1">of your {props.distanceObjective} km objective.</Typography>
				</div>
			</Container>
		</CardContent>
	</Card>;
}

export default ProgressOverviewCard;