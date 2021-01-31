import React, { useEffect, useState } from 'react';

import { TextField, InputAdornment } from '@material-ui/core';

interface IOdometerFieldProps {
	id: string;
	label: string;
	placeholder: string;
	hint: string;
	value: number;
	onChange: (odometerValue: number) => void;
	min?: number;
}

/**
 * Renders a text field that take a required odometer value (number) as an
 * input.
 *
 * Note: it would nice to actually show a formatted number.
 */
function OdometerField(props: IOdometerFieldProps) {

	const { hint, min, onChange } = { ...props };

	const [text, setText] = useState<string>(props.value.toString());
	const [value, setValue] = useState<number>(props.value);
	const [validation, setValidation] = useState({
		valid: value >= (min ? min : 0),
		hint: props.hint
	});

	useEffect(() => {
		const isValid = value >= (min ? min : 0);
		let h = isValid ? hint : `The odometer must be greater than ${min ? min : 0} km.`;
		setValidation({ valid: isValid, hint: h });
		onChange(value);
	}, [value, min, hint, onChange]);

	return <TextField required
		id={props.id}
		label={props.label}
		type="number"
		placeholder={props.placeholder}
		value={text}
		variant="outlined"
		fullWidth={true}
		helperText={validation.hint}
		margin="normal"
		InputProps={{ endAdornment: <InputAdornment position="end">Km</InputAdornment>, }}
		onChange={(event: React.ChangeEvent<any>) => {
			if (event.target.value === "") {
				setText("");
				setValidation({ valid: false, hint: "Please, complete the field properly." });
			} else {
				setText(event.target.value);
				setValue(parseInt(event.target.value));
			}
		}}
		error={!validation.valid}
	/>;
}

export default OdometerField;