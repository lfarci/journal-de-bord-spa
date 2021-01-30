import React, { useEffect, useState } from "react";
import { Fab } from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import RideList from "./RideList";
import { Ride } from "../../../../types";
import { Page } from "../../../common";
import { useHistory, useRouteMatch } from "react-router-dom";

import "./Rides.scss";
import { AuthService } from "../../../../services/AuthService";
import { RideService } from "../../../../services/RideService";
import { User } from "oidc-client";

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

    useEffect(() => {
        console.log("efect");
        const getRides = async () => {
            const authService = new AuthService();
            try {
                const user: User | null = await authService.getUser();
                if (user) {
                    if (state.deletableRideId !== undefined) {
                        await RideService.deleteById(state.deletableRideId);
                    }
                    const rides = await RideService.getAll(user.profile.sub);
                    setState(prev => ({
                        ...prev,
                        rides: rides,
                        isLoading: false,
                        error: undefined,
                        deletableRideId: undefined
                    }));
                }
            } catch (error) {
                error.name = errorTitle;
                error.message = errorMessage;
                console.error(error);
                setState(prev => ({ ...prev, isLoading: false, error: error }));
            }
        };
        getRides();
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