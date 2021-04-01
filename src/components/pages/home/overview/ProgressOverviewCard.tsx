import React, { useCallback, useEffect, useState } from "react";

import "./ProgressOverviewCard.scss";

import { Card, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Progress from "./Progress";
import { Skeleton } from "@material-ui/lab";
import DriverService from "../../../../services/DriverService";
import { DriverStatistics } from "../../../../types";

interface IProgressOverviewCardState {
    statistics: DriverStatistics | undefined;
    isLoading: boolean;
    error: Error | undefined;
}

const getPercentage = (distance: number, total: number) => {
    return distance / total * 100;
};

function ProgressOverviewCard(props: {}) {

    const [state, setState] = useState<IProgressOverviewCardState>({
        statistics: undefined,
        isLoading: true,
        error: undefined
    });

    const distance = () => state.statistics === undefined ? 0 : state.statistics.totalDistance;
    const objective = () => state.statistics === undefined ? 0 : state.statistics.driver.objective;
    const progress = () => getPercentage(distance(), objective());
    const hasDriven = (): boolean => !state.isLoading && progress() > 0;

    const progressText = () => `${distance()} of ${objective()} km`;
    const getPrimaryText = () => hasDriven() ? progressText() : "Start driving now!";
    const getSecondaryText = () => hasDriven() ? "You have driven" : "Your journal is empty,";

    const showLoading = () => state.isLoading && state.error === undefined;
    const showError = () => !state.isLoading && state.error !== undefined;

    const fetchDriverStatistics = useCallback(async () => {
        try {
            const stats = await DriverService.getDriverStatistics();
            if (stats) {
                setState(prev => ({ ...prev, isLoading: false, statistics: stats }));
            } else {
                setState(prev => ({ ...prev, isLoading: false, error: new Error() }));
            }
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false, error: error }));
        }
    }, []);

    useEffect(() => {
        if (state.statistics === undefined) {
            fetchDriverStatistics();
        }
    }, [fetchDriverStatistics, state.statistics]);

    return <Card elevation={12} className={`progress-overview-card home-progress-overview-card`}>
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
            {showLoading() && <Skeleton variant="circle"><Progress value={progress()} /></Skeleton>}
            { state.error === undefined && !state.isLoading && <Progress value={progress()} />}
        </CardContent>
    </Card>;
}

export default ProgressOverviewCard;