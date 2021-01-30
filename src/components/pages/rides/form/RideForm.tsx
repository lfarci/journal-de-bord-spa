import React, { useState } from 'react';

import "./RideForm.scss";

import { Button, Typography, Divider } from '@material-ui/core';

import { CommentField, TrafficConditionField, TrafficCondition } from './fields';
import { Ride, Stop } from '../../../../types';
import StopForm from './StopForm';
import { Page } from '../../../common';

interface IRideFormProps {
	/**
	 * Is the form ride.
	 */
	ride: Ride;
	/**
	 * if set to true then the form shows arrival and retrospective ones.
	 */
	isDriving: boolean;
	isLoading: boolean;
	error: Error | undefined;
	/**
	 * Called when the form values are changed.
	 *
	 * @param data is the updated data.
	 */
	onChange: (data: Ride) => void;
	/**
	 * Called when the submit button is clicked. data contain the data
	 * submitted by the user.
	 */
	onSubmit: (data: Ride) => void;
}

function isDepartureBeforeArrival(ride: Ride): boolean {
	return ride.arrival !== undefined
		&& ride.departure.moment.getTime() < ride.arrival?.moment.getTime();
}

function areOdometerValuesValid(ride: Ride): boolean {
	return ride.arrival !== undefined
		&& ride.departure.odometerValue < ride.arrival?.odometerValue;
}

function isValid(ride: Ride): boolean {
	return ride.arrival === undefined
		|| (areOdometerValuesValid(ride) && isDepartureBeforeArrival(ride));
}

function getErrorMessages(ride: Ride): string[] {
	const errorMessages: string[] = [];
	if (!isDepartureBeforeArrival(ride)) {
		errorMessages.push("The departure should be before the arrival.");
	}
	if (!areOdometerValuesValid(ride)) {
		errorMessages.push("The departure odometer value should be smaller than the arrival one.");
	}
	return errorMessages;
}

function RideForm(props: IRideFormProps) {

	const [ride, setRide] = useState<Ride>(props.ride);
	const [messages, setMessages] = useState<string[]>(getErrorMessages(ride));

	const handleChange = (ride: Ride) => {
		if (isValid(ride)) {
			setRide(ride);
		}
		setMessages(getErrorMessages(ride));
	}

	return <Page title="New ride" isLoading={props.isLoading} error={props.error}>
		<div id="ride-form-container">
			<StopForm datetime
				title="Departure"
				value={ride.departure}
				onChange={(data: Stop) => {
					const newRide = { ...ride };
					newRide.departure = { ...data };
					handleChange(newRide);
				}}
			/>
			<StopForm datetime
				title="Arrival"
				value={ride.arrival!!}
				onChange={(data: Stop) => {
					const newRide = { ...ride };
					newRide.arrival = { ...data };
					handleChange(newRide);
				}}
			/>
			<Typography variant="h6">Retrospective</Typography>
			<Divider />
			<TrafficConditionField
				id="traffic-condition"
				label="Traffic condition"
				hint="Select the option that represent the best the traffic condition of your last ride."
				value={ride.trafficCondition}
				onChange={(data: TrafficCondition) => {
					const newRide = { ...ride };
					newRide.trafficCondition = data;
					handleChange(newRide);
				}}
			/>
			<CommentField
				id="comment"
				label="Comment"
				hint="Let us know if you encountered any difficulties during your ride."
				value={ride.comment}
				onChange={(data: string) => {
					const newRide = { ...ride };
					newRide.comment = data;
					handleChange(newRide);
				}}
			/>
			<div className="ride-form-messages">
				{messages.map(message => <Typography
					className="ride-form-message"
					variant="body2"
					color="error">
					{message}
				</Typography>)}
			</div>
			<Button
				variant="contained"
				color="primary"
				size="large"
				disabled={!isValid(ride)}
				onClick={() => props.onSubmit(ride)}
			>
				Save
			</Button>
		</div >
	</Page>;
}

export default RideForm;