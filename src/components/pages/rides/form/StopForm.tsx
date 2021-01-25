import React, { useState } from 'react';

import { LocationField, OdometerField } from './fields';
import { Stop, Location } from '../../../../types';
import DatetimeField from './fields/DatetimeField';
import { Typography, Divider } from '@material-ui/core';

interface IStopFormProps {
	/**
	 * This form title.
	 */
	title?: string;
	/**
	 * The form description.
	 */
	description?: string;
	/**
	 * Is the form data.
	 */
	value?: Stop;
	/**
	 * Called when the stop data change.
	 */
	onChange: (data: Stop) => void;
	/**
	 * When set to true the form asks the user for a date. Otherwise, the date
	 * is set to now.
	 */
	datetime?: boolean;
}

function getDefaultValue(value: Stop | undefined): Stop {
	if (value === undefined) {
		return {
			moment: new Date(),
			location: {
				name: "Home",
				latitude: 0.0,
				longitude: 0.0
			},
			odometerValue: 0
		};
	}
	return value;
}

/**
 * The fields are used to describe a stop. A stop is made of a moment, a
 * location and an odometer value.
 *
 * @param props aree the components properties.
 */
function StopForm(props: IStopFormProps) {

	const [stop, setStop] = useState<Stop>(getDefaultValue(props.value));

	const hasTitle = (): boolean => props.title !== undefined;
	const showDateTime = (): boolean => props.datetime === undefined ? false : props.datetime;

	const fetchLocations = (): Location[] => {
		return [
			{ id: 0, name: "Home", latitude: 34.34, longitude: 23.23 },
			{ id: 1, name: "Workplace", latitude: 34.34, longitude: 23.23 },
			{ id: 2, name: "Store", latitude: 34.34, longitude: 23.23 },
			{ id: 3, name: "Library", latitude: 34.34, longitude: 23.23 },
		];
	}

	return (
		<div>
			{
				hasTitle() && <div>
					<Typography variant="h6">{props.title}</Typography>
					<Divider/>
				</div>
			}
			<OdometerField
				id="stop-odometer-value"
				label="Odometer Value"
				placeholder="e.g. 454543"
				hint="Enter the current odometer value of your vehicle."
				value={stop.odometerValue}
				onChange={(value: number) => {
					const editedStop = {...stop};
					editedStop.odometerValue = value;
					setStop(editedStop);
					props.onChange(editedStop);
				}}
			/>
			<LocationField
				id="stop-location"
				label="Location"
				placeholder="e.g. Home"
				hint="Enter your current location name"
				options={fetchLocations()}
				value={stop.location}
				onChange={(value: Location) => {
					const editedStop = {...stop};
					editedStop.location = value;
					setStop(editedStop);
					props.onChange(editedStop);
				}}
			/>
			{ showDateTime() && <DatetimeField
				id="stop-datetime"
				label="Date and time"
				hint="Enter the stop date and time."
				value={stop.moment}
				onChange={(value: Date) => {
					const editedStop = {...stop};
					editedStop.moment = value;
					setStop(editedStop);
					props.onChange(editedStop);
				}}
			/>}
		</div>
	);
}

export default StopForm;