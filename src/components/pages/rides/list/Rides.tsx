import React, { useEffect, useState } from "react";
import { Fab } from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import RideList from "./RideList";
import { Ride } from "../../../../types";
import { ConfirmationDialogue, Page } from "../../../common";
import { useHistory, useRouteMatch } from "react-router-dom";

import "./Rides.scss";
import RideService from "../../../../services/RideService";

export type RideScreenContentKey = "form" | "list" | "details";

interface IRidesState {
    rides: Ride[];
    selectedRideId: number | undefined;
    deletableRideId: number | undefined;
    isLoading: boolean;
    error: Error | undefined;
    page: number;
    hasLoadAllRides: boolean;
    loadingMore: boolean;
    showDeleteDialogue: boolean;
}

/**
 * Shows all the rides for the current user. The page action opens the ride
 * form.
 */
function Rides(props: {}) {

    const PAGE_SIZE = 10;

    const history = useHistory();
    const { path } = useRouteMatch();
    const errorTitle = "Error while loading your rides";
    const errorMessage = "The application wasn't able to load your rides. This is an internal error. Try again.";

    const [state, setState] = useState<IRidesState>({
        rides: [],
        selectedRideId: undefined,
        deletableRideId: undefined,
        isLoading: true,
        error: undefined,
        page: 0,
        hasLoadAllRides: false,
        loadingMore: false,
        showDeleteDialogue: false
    });

    useEffect(() => {
        const handleChange = async () => {
            try {
                if (state.deletableRideId !== undefined) {
                    await RideService.deleteById(state.deletableRideId);
                }
                const data = await RideService.getAll(0, PAGE_SIZE);
                setState(prev => ({
                    ...prev,
                    rides: data.rides,
                    isLoading: false,
                    deletableRideId: undefined,
                    page: 1,
                    hasLoadAllRides: data.isLastPage
                }));
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
                showLoadMore={!state.hasLoadAllRides}
                loadingMore={state.loadingMore}
                onDelete={(rideId: number) => {
                    setState(prev => ({ ...prev, showDeleteDialogue: true, selectedRideId: rideId }));
                }}
                onShowDetails={(rideId: number) => history.push(`${path}/${rideId}`)}
                onLoadMore={async () => {
                    try {
                        setState(prev => ({ ...prev, loadingMore: true }));
                        const data = await RideService.getAll(state.page, PAGE_SIZE);
                        let rides = [...state.rides];
                        rides = rides.concat(data.rides);
                        setState(prev => ({
                            ...prev,
                            rides: rides,
                            page: prev.page + 1,
                            hasLoadAllRides: data.isLastPage,
                            loadingMore: false
                        }));
                    } catch (error) {
                        setState(prev => ({ ...prev, isLoading: false, error: error }));
                    }
                }}
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
        {state.showDeleteDialogue && <ConfirmationDialogue
            title="Delete the ride?"
            text="After you click the delete button, the selected ride will be lost permanently."
            confirmButtonText="Delete"
            onClose={() => setState(prev => ({ ...prev, showDeleteDialogue: false }))}
            onConfirmation={() => {
                setState(prev => ({ 
                    ...prev,
                    showDeleteDialogue: false,
                    deletableRideId: prev.selectedRideId,
                    selectedRideId: undefined
                }));
            }}
        />}
    </Page>;
}

export default Rides;