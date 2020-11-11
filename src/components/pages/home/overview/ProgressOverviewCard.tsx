import React from "react";

import "./ProgressOverviewCard.scss";

import { Card, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Progress from "./Progress";

interface IProgressOverviewCardProps {
	className?: string;
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

	const hasDriven = (): boolean => percentage > 0;
	const getClassName = () => props.className === undefined ? "" : props.className;
	const getStatus = () => `${props.currentDistance} of ${props.distanceObjective} km`;
	const getSecondaryText = () => hasDriven() ? "You have driven" : "Your journal is empty,";
	const getPrimaryText = () => hasDriven() ? getStatus() : "Start driving now!";

	return <Card elevation={12} className={`progress-overview-card ${getClassName()}`}>
		<CardContent className="progress-overview-card-content">
			<div className="progress-overview-card-start">
				<div className="progress-overview-card-icon-parent">
					<img className="progress-overview-card-icon" src="car-icon.svg" />
				</div>
				<div className="progress-overview-card-texts">
					<div><Typography variant="subtitle1">{getSecondaryText()}</Typography></div>
					<div><Typography variant="h6">{getPrimaryText()}</Typography></div>
				</div>
			</div>
			<Progress value={percentage} />
		</CardContent>
	</Card>;
}

export default ProgressOverviewCard;