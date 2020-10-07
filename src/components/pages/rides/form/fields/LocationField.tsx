import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Location } from '../../../../../types';

interface ILocationFieldProps {
	id: string;
	label: string;
	placeholder: string;
	hint: string;
	options: Location[];
	value: Location;
	onChange: (location: Location) => void;
}

/**
 * Renders a text field that allows the user to enter a location name.
 *
 * Note: it would be awesome if the autocomplete was actually fecthing data
 * from the Google Maps services:
 * https://material-ui.com/components/autocomplete/#google-maps-place
 */
function LocationField(props: ILocationFieldProps) {
	const [isValid, setValid] = useState<boolean>(true);
	const [hint, setHint] = useState<string>(props.hint);
	const [location, setLocation] = useState<Location>(props.value);
	return <Autocomplete freeSolo
		options={props.options.map(option => option.name)}
		value={location.name}
		renderInput={(params) => (
			<TextField {...params}
				id={props.id}
				label={props.label}
				type="text"
				placeholder={props.placeholder}
				variant="outlined"
				fullWidth={true}
				margin="normal"
				helperText={hint}
				error={!isValid}
			/>
		)}
		onChange={(event: React.ChangeEvent<any>, newValue: string | null) => {
			let location = props.options.find(o => o.name === newValue);
			if (location) {
				setLocation(location!!);
			} else {
				setLocation({
					name: newValue!!,
					latitude: 0,
					longitude: 0
				});
			}
			setValid(true);
			setHint(props.hint);
			props.onChange(location!!);
		}}
	/>;
}

export default LocationField;