import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Location } from '../../../types';

interface ILocationFieldProps {
    id: string;
    label: string;
    placeholder: string;
    hint: string;
    options: Location[];
    value: string;
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
    return <Autocomplete freeSolo
        options={props.options.map(option => option.name)}
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
        onChange={(event: React.ChangeEvent<any>, newValue: string | null) => {
            // const newValue: string = event.target.value;
            if (newValue == null) 
                console.log("newValue is null: " + event.target.value);
            else {
                console.log("Selected location: " + newValue);
            }
            let location = props.options.find(o => o.name == newValue);
            if (location == undefined) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log("Got position", position.coords);
                    location = {
                        name: newValue!!,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            }
            props.onChange(location!!);
        }}
    />;
}

export default LocationField;