import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface ILocationFieldProps {
    id: string;
    label: string;
    placeholder: string;
    hint: string;
    options: string[];
    value: string;
}

/**
 * Renders a text field that allows the user to enter a location name.
 * 
 * Note: it would be awesome if the autocomplete was actually fecthing data
 * from the Google Maps services: 
 * https://material-ui.com/components/autocomplete/#google-maps-place
 */
function LocationField(props: ILocationFieldProps) {
    return <Autocomplete freeSolo
        options={props.options}
        renderInput={(params) => (
            <TextField {...params}
                id={props.id}
                label={props.label}
                type="text"
                placeholder={props.placeholder}
                variant="outlined"
                fullWidth={true}
                margin="normal"
                helperText={props.hint}
                value={props.value}
            />
        )}
    />;
}

export default LocationField;