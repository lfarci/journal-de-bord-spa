import React from "react";

import "./ProgressOverviewCard.scss";

import { Card } from "@material-ui/core";
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

	return <Card elevation={12} className="progress-overview-card">
		<CardContent className="progress-overview-card-content">
			<div className="progress-overview-card-start">
				<div className="progress-overview-card-icon-parent">
					<img className="progress-overview-card-icon" src="car-icon.svg" />
				</div>
				<div  className="progress-overview-card-texts">
					<p className="progress-overview-card-title">You have driven</p>
					<p className="progress-overview-card-status">437 of 1500 km</p>
				</div>
			</div>
			<Progress value={percentage}/>
		</CardContent>
	</Card>;
}

export default ProgressOverviewCard;