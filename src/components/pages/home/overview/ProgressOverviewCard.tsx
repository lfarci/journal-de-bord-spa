import React, { useEffect, useState } from "react";

import "./ProgressOverviewCard.scss";

import { Card, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Progress from "./Progress";
import { ResourcesService } from "../../../../services/ResourcesService";
import { AuthService } from "../../../../services/AuthService";
import { Skeleton } from "@material-ui/lab";

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

interface IProgressOverviewCardState {
	isLoading: boolean;
	error: Error | undefined;
	drivenDistance: number | undefined;
	distanceObjective: number | undefined;
}

/**
 * Cards that gives an overview of the current user progress.
 */
function ProgressOverviewCard(props: IProgressOverviewCardProps) {

	const [state, setState] = useState<IProgressOverviewCardState>({
		isLoading: true,
		error: undefined,
		drivenDistance: undefined,
		distanceObjective: undefined
	});

	const getPercentage = (distance: number, total: number) => {
		return distance / total * 100;
	};
	const hasDriven = (): boolean => !state.isLoading && state?.drivenDistance!! > 0;
	const getClassName = () => props.className === undefined ? "" : props.className;
	const getStatus = () => `${state.drivenDistance} of ${state.distanceObjective} km`;
	const getSecondaryText = () => hasDriven() ? "You have driven" : "Your journal is empty,";
	const getPrimaryText = () => hasDriven() ? getStatus() : "Start driving now!";

	const showLoading = () => state.isLoading && state.error === undefined;
	const showError = () => !state.isLoading && state.error !== undefined;

	useEffect(() => {
		const resources = new ResourcesService();
		const getProgress = async () => {
			const user = await new AuthService().getUser();
			if (user) {
				try {
					const progress = await resources.getProgress(user?.profile.sub);
					setState((prev) => ({
						...prev,
						isLoading: false,
						drivenDistance: progress.drivenDistance,
						distanceObjective: progress.distanceObjective
					}));
				} catch (error) {
					setState((prev) => ({ ...prev, isLoading: false, error: error }));
				}
			}
		};
		if (new AuthService().isLoggedIn()) {
			getProgress();
		}
	}, []);

	return <Card elevation={12} className={`progress-overview-card ${getClassName()}`}>
		<CardContent className="progress-overview-card-content">
			<div className="progress-overview-card-start">
				<div className="progress-overview-card-icon-parent">
					<img alt="Car Icon" className="progress-overview-card-icon" src="car-icon.svg" />
				</div>
				{showError()
					? (
						<div className="progress-overview-card-texts">
							<div><Typography variant="subtitle1">
								Something went wrong,
							</Typography></div>
							<div><Typography variant="h6">
								Your progress couldn't be loaded!
							</Typography></div>
						</div>
					)
					: (
						<div className="progress-overview-card-texts">
							<div><Typography variant="subtitle1">
								{showLoading() ? <Skeleton /> : getSecondaryText()}
							</Typography></div>
							<div><Typography variant="h6">
								{showLoading() ? <Skeleton /> : getPrimaryText()}
							</Typography></div>
						</div>
					)
				}
			</div>
			{showLoading()
				? <Skeleton variant="circle"><Progress value={getPercentage(state?.drivenDistance!!, state?.distanceObjective!!)} /></Skeleton>
				: <Progress value={getPercentage(state?.drivenDistance!!, state?.distanceObjective!!)} />
			}
		</CardContent>
	</Card>;
}

export default ProgressOverviewCard;