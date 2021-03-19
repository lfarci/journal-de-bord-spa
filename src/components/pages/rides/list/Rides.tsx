import React, { useEffect, useState } from "react";
import { Fab } from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import RideList from "./RideList";
import { Ride } from "../../../../types";
import { Page } from "../../../common";
import { useHistory, useRouteMatch } from "react-router-dom";

import "./Rides.scss";
import { AuthService } from "../../../../services/AuthService";
import { User } from "oidc-client";
import RideService from "../../../../services/RideService";

export type RideScreenContentKey = "form" | "list" | "details";

interface IRidesState {
    rides: Ride[];
    deletableRideId: number | undefined;
    isLoading: boolean;
    error: Error | undefined;
}

/**
 * Shows all the rides for the current user. The page action opens the ride
 * form.
 */
function Rides(props: {}) {

    const history = useHistory();
    const { path } = useRouteMatch();
    const errorTitle = "Error while loading your rides";
    const errorMessage = "The application wasn't able to load your rides. This is an internal error. Try again.";

    const [state, setState] = useState<IRidesState>({
        rides: [],
        deletableRideId: undefined,
        isLoading: true,
        error: undefined
    });

    const deleteRide = async () => {
        if (!state.deletableRideId) return;
        const rides = [ ...state.rides ];
        const target = rides.find(r => r.id === state.deletableRideId);
        if (target) {
            rides.splice(rides.indexOf(target), 1);
        }
        await RideService.deleteById(state.deletableRideId);
        setState(prev => ({ ...prev, rides: rides, isLoading: false }));
    };

    useEffect(() => {
        const handleChange = async () => {
            try {
                if (state.deletableRideId !== undefined) {
                    deleteRide();
                } else {
                    const rides = await RideService.getAll();
                    setState(prev => ({ ...prev, rides: rides, isLoading: false }));
                }
            } catch (error) {
                error.name = errorTitle;
                error.message = errorMessage;
                setState(prev => ({ ...prev, isLoading: false, error: error }));
            }
        };
        handleChange();
    }, [state.deletableRideId]);

    return <Page title="My rides" selected="history" isLoading={state.isLoading} error={state.error} showBottomNavigation>
        <div className="rides-content">
            <RideList
                rides={state.rides}
                onDelete={(rideId: number) => {
                    if (window.confirm("De you really want to delete the ride?")) {
                        setState(prev => ({ ...prev, isLoading: true, deletableRideId: rideId }));
                    }
                }}
                onShowDetails={(rideId: number) => history.push(`${path}/${rideId}`)}
            />
            <Fab
                color="primary"
                aria-label="add"
                className="action-button"
                onClick={() => history.push(`${path}/form`)}
            >
                <AddIcon />
            </Fab>
        </div>
    </Page>;
}

export default Rides;