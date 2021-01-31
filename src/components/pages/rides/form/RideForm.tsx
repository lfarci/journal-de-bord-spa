import React, { useEffect, useState } from 'react';

import "./RideForm.scss";

import { Button, Typography, Divider } from '@material-ui/core';

import { CommentField, TrafficConditionField, TrafficCondition } from './fields';
import { isStopBefore, Ride, Stop } from '../../../../types';
import StopForm from './StopForm';

interface IRideFormProps {
	/**
	 * Is the form ride.
	 */
	ride?: Ride;
	/**
	 * if set to true then the form shows arrival and retrospective ones.
	 */
	isDriving: boolean;
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

const makeRide = (dep: Stop, arr: Stop, tc: TrafficCondition, com: string) => ({
	departure: dep,
	arrival: arr,
	trafficCondition: tc,
	comment: com,
	driverPseudonym: undefined
});


const RideForm = (props: IRideFormProps) => {

	const getDefaultDeparture = () => props.ride ? props.ride.departure : undefined;
	const getDefaultArrival = () => props.ride && props.ride.arrival ? props.ride.arrival : undefined;
	const getDefaultTrafficCondition = () => props.ride ? props.ride.trafficCondition : TrafficCondition.CALM;
	const getDefaultComment = () => props.ride ? props.ride.comment : undefined;

	const [departure, setDeparture] = useState<Stop | undefined>(getDefaultDeparture());
	const [arrival, setArrival] = useState<Stop | undefined>(getDefaultArrival());
	const [trafficCondition, setTrafficCondition] = useState<TrafficCondition>(getDefaultTrafficCondition());
	const [comment, setComment] = useState<string | undefined>(getDefaultComment());

	const [validation, setValidation] = useState<{
		messages: string[], valid: boolean
	}>({
		messages: [],
		valid: false
	});

	const [valid, setValid] = useState<boolean>(true);

	const { onSubmit } = { ...props };
	const hasEnoughData = () => departure && arrival && trafficCondition && comment;

	useEffect(() => {

		if (hasEnoughData()) {
			// const ride = makeRide(departure, arrival, trafficCondition, comment);

		}

		console.log("RIDE CHANGE", JSON.stringify({
			departure: departure,
			arrival: arrival,
			trafficCondition: trafficCondition,
			comment: comment,
			driverPseudonym: undefined
		}, null, 2));
		if (departure && arrival) {
			const errorMessages: string[] = [];
			if (!isStopBefore(arrival, departure)) {
				errorMessages.push("The departure should be before the arrival.");
			}
			if (arrival.odometerValue <= departure.odometerValue) {
				errorMessages.push("The departure odometer value should be smaller than the arrival one.");
			}
			console.log("VALIDATION: ", errorMessages);
			setValidation({ 
				valid: errorMessages.length === 0,
				messages: errorMessages
			});
		}
	}, [departure, arrival, trafficCondition, comment, onSubmit]);



	return <div id="ride-form-container">
		<StopForm datetime 
			title="Departure"
			value={departure}
			onChange={setDeparture}
		/>
		<StopForm datetime
			title="Arrival"
			value={arrival}
			onChange={setArrival}
		/>
		<Typography variant="h6">Retrospective</Typography>
		<Divider />
		<TrafficConditionField
			id="traffic-condition"
			label="Traffic condition"
			hint="Select the option that represent the best the traffic condition of your last ride."
			value={trafficCondition}
			onChange={setTrafficCondition}
		/>
		<CommentField
			id="comment"
			label="Comment"
			hint="Let us know if you encountered any difficulties during your ride."
			value={comment}
			onChange={setComment}
		/>
		<div className="ride-form-messages">
			{validation.messages.map(message => <Typography
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
			disabled={!valid}
			onClick={() => 	onSubmit({
				departure: departure!!,
				arrival: arrival!!,
				trafficCondition: trafficCondition,
				comment: comment,
				driverPseudonym: undefined
			})}
		>
			Save
		</Button>
	</div >;
}

export default RideForm;