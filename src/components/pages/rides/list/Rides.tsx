import React, { useEffect, useState } from "react";
import { Fab } from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import RideList from "./RideList";
import { Ride } from "../../../../types";
import { Page } from "../../../common";
import { useHistory, useRouteMatch } from "react-router-dom";

import "./Rides.scss";
import { ResourcesService } from "../../../../services/ResourcesService";

export type RideScreenContentKey = "form" | "list" | "details";

interface IRidesState {
	rides: Ride[];
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

	const [state, setState] = useState<IRidesState>({
		rides: [],
		isLoading: true,
		error: undefined
	});

	useEffect(() => {
		const getRides = async () => {
			const resourceServer = new ResourcesService();
			try {
				const rides: Ride[] = await resourceServer.getRides('userid');
				throw "BOUM";
				setState({ rides: rides, isLoading: false, error: undefined });
			} catch (error) {
				setState({ rides: [], isLoading: false, error: error });
			}
		};
		getRides();
	}, []);

	return <Page title="My rides" selected="rides" isLoading={state.isLoading} error={state.error}>
		<div className="rides-content">
			<RideList
				rides={state.rides}
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