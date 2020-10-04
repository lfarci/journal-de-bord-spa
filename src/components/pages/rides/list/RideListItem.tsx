import React from "react";

import { TrafficCondition } from "../form/fields";
import { Card, Typography, CardContent, Grid, Chip, createStyles, makeStyles, Theme, Button, CardActions } from "@material-ui/core";

import SpeedRoundedIcon from '@material-ui/icons/SpeedRounded';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';
import { Ride } from "../../../../types";

const humanizeDuration = require("humanize-duration");
const moment = require("moment");

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		chips: {
			marginTop: 5
		},
		chip: {
			marginTop: 5,
			marginRight: 5
		}
	}),
);

interface IRideListItem {
	/**
	 * Unique key of the list item. The value is set for the key prop of the
	 * component root element.
	 */
	key: number | string;
	/**
	 * Is the list item class name. They are set on the root element.
	 */
	className: string;
	/**
	 * Is the represented ride.
	 */
	ride: Ride;
	/**
	 * Called when the details button is clicked.
	 */
	onDetails: () => void;
	/**
	 * Called when the delete button is clicked.
	 */
	onDelete: () => void;
}

function RideListItem(props: IRideListItem) {

	const classes = useStyles();

	const getTitle = (ride: Ride) => {
		const departureLocationName: string = ride.departure.location.name;
		let arrivalLocationName: string = "...";
		if (ride.arrival) {
			arrivalLocationName = ride.arrival!!.location.name;
		}
		return `${departureLocationName} - ${arrivalLocationName}`;
	}

	const getDistance = (ride: Ride) => {
		if (ride.arrival == null) throw new RangeError();
		return ride.arrival?.odometerValue - ride.departure.odometerValue;
	}

	const getDuration = (ride: Ride): number => {
		if (ride.arrival == null) throw new RangeError();
		const departureDate = moment(ride.departure.moment);
		const arrivalDate = moment(ride.arrival.moment);
		const duration = moment.duration(departureDate.diff(arrivalDate));
		return duration.asMilliseconds();
	}

	return (
		<Card key={props.key} className={props.className} elevation={12}>
			<CardContent>
				<Grid
					container
					justify="flex-start"
					direction="column"
				>
					<Grid item>
						<Typography variant="h6">{getTitle(props.ride)}</Typography>
						<Typography variant="caption">{props.ride.departure.moment.toLocaleDateString()}</Typography>
					</Grid>
					<Grid container
						direction="row"
						justify="flex-start"
						className={classes.chips}
					>
						<Grid item>
							<Chip
								icon={<SpeedRoundedIcon />}
								label={getDistance(props.ride) + " km"}
								color="default"
								className={classes.chip}
								size="small"
								variant="outlined"
							/>
						</Grid>
						<Grid item>
							<Chip
								icon={<AccessTimeRoundedIcon />}
								label={humanizeDuration(getDuration(props.ride))}
								color="default"
								className={classes.chip}
								size="small"
								variant="outlined"
							/>
						</Grid>
						<Grid item>
							<Chip
								icon={<DriveEtaRoundedIcon />}
								label={TrafficCondition[props.ride.trafficCondition]}
								color="default"
								className={classes.chip}
								size="small"
								variant="outlined"
							/>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Button size="small" color="primary" onClick={props.onDetails}>Details</Button>
				<Button size="small" color="primary" onClick={props.onDelete}>Remove</Button>
			</CardActions>
		</Card>
	);
}

export default RideListItem;