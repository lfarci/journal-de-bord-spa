import React, { useEffect, useState } from 'react';

import { TextField } from '@material-ui/core';

const moment = require("moment");

interface IDatetimeFieldProps {
	id: string;
	label: string;
	hint: string;
	value: Date;
	min?: Date,
	onChange: (date: Date) => void;
}

const isBefore = (date: Date, previous: Date): boolean => {
	const previousMoment = moment(previous).second(0).milliseconds(0);
    const currentMoment = moment(date).second(0).milliseconds(0);
    return previousMoment.isBefore(currentMoment);
}

function DatetimeField(props: IDatetimeFieldProps) {

	const { min } = { ...props };
	const [value, setValue] = useState<Date>(props.value);
	const [hint, setHint] = useState<string>(props.hint);

	const handleChange = (event: React.ChangeEvent<any>, child?: React.ReactNode): void | undefined => {
		const dateString: string = event.target.value;
		const date: Date = new Date(dateString);
		setValue(date);
		props.onChange(date);
	}

	const format = (date: Date): string => {
		return moment(date).format("YYYY-MM-DDTHH:mm");
	}

	useEffect(() => {
		if (min && !isBefore(value, min)) {
			setHint(`The date should be after ${min.toLocaleDateString()}, ${min.toLocaleTimeString()}.`);
		} else {
			setHint(hint);
		}
	}, [value, min, hint]);

	return <TextField
		className="input"
		id={props.id}
		label={props.label}
		type="datetime-local"
		variant="outlined"
		margin="normal"
		fullWidth={true}
		helperText={hint}
		onChange={handleChange}
		defaultValue={format(value)}
		error={min && !isBefore(value, min)}
	/>;
}

export default DatetimeField;