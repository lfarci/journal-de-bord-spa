import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import { Location } from '../../../../../types';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

interface LocationOption {
    userInput?: string;
    label: string;
};

interface ILocationFieldProps {
    id: string;
    label: string;
    placeholder: string;
    hint: string;
    options: Location[];
    value: Location;
    onChange: (location: Location) => void;
}

const findLocation = (option: LocationOption, locations: Location[]): Location => {
    const locationName = option.userInput ? option.userInput : option.label;
    let location = locations.find(l => l.name === locationName);
    if (!location) {
        // TODO: find the current location
        location = {
            name: locationName,
            latitude: 0.0,
            longitude: 0.0
        };
    }
    return location;
}

/**
 * Renders a text field that allows the user to enter a location name.
 *
 * Note: it would be awesome if the autocomplete was actually fecthing data
 * from the Google Maps services:
 * https://material-ui.com/components/autocomplete/#google-maps-place
 */
function LocationField(props: ILocationFieldProps) {

    const [locationOption, setLocation] = useState<LocationOption | null>({
        label: props.value.name
    });

    const { onChange: handleChange, options: locations } = props;

    const filter = createFilterOptions<LocationOption>();
    const options: LocationOption[] = props.options.map(option => ({ label: option.name }));

    useEffect(() => {
        if (locationOption) {
            const location = findLocation(locationOption, locations);
            handleChange(location);
        }
    }, [locationOption, locations, handleChange]);

    return <Autocomplete freeSolo
        options={options}
        value={locationOption}
        renderOption={option => option.label}
        getOptionLabel={(option) => {
            if (typeof option === 'string') return option;
            if (option.userInput) return option.userInput;
            return option.label;
        }}
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
                error={false}
            />
        )}
        onChange={(event: React.ChangeEvent<any>, newValue: string | LocationOption | null) => {
            if (typeof newValue === 'string') {
                setLocation({ label: newValue });
            } else if (newValue && newValue.userInput) {
                setLocation({ label: newValue.userInput });
            } else {
                setLocation(newValue);
            }
        }}
        filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== '') {
                filtered.push({
                    userInput: params.inputValue,
                    label: `Save my location as "${params.inputValue}"`,
                });
            }
            return filtered;
        }}
    />;
}

export default LocationField;