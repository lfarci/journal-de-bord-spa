import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import { Location } from '../../../../../types';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { GeolocationService } from '../../../../../services/GeolocationService';
import LocationService, { LocationData } from '../../../../../services/LocationService';
import { Fastfood } from '@material-ui/icons';

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
    onError?: (error: Error) => void;
}

const findLocation = (optionLabel: string, locations: Location[]): Location | undefined => {
    return locations.find(l => l.name === optionLabel);
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
    const [options, setOptions] = useState<LocationOption[]>([]);
    const [currentLocation, setCurrentLocation] = useState<Location | undefined>(undefined);

    const { onChange: handleChange, options: locations } = props;
    const filter = createFilterOptions<LocationOption>();

    const createLocation = async (name: string): Promise<boolean> => {
        try {
            await LocationService.create({
                name: name,
                longitude: 0.0,
                latitude: 0.0
            });
            return true;
        } catch (error) {
            if (props.onError) {
                props.onError(error);
            }
            return false;
        }
    }

    useEffect(() => {

        const fetchAvailableLocations = async () => {
            const data: LocationData[] = await LocationService.getAll();
            setOptions(data.map(location => ({ label: location.name })));
        };
        fetchAvailableLocations();

        const askForCurrentLocation = async (locationName: string) => {
            setCurrentLocation(await GeolocationService.makeCurrentLocation(locationName));
        }

        if (locationOption) {
            let location = findLocation(locationOption.label, locations);
            const askable = !currentLocation || currentLocation.name !== locationOption.label;
            if (!location && askable) { 
                askForCurrentLocation(locationOption.label);
            }
            if (!location && currentLocation) { 
                location = currentLocation;
            }
            if (location) { 
                handleChange(location);
            }
        }
    }, [locationOption, currentLocation, locations, handleChange]);

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
        onChange={async (event: React.ChangeEvent<any>, newValue: string | LocationOption | null) => {
            if (typeof newValue === 'string') {
                setLocation({ label: newValue });
            } else if (newValue && newValue.userInput) {
                if (await createLocation(newValue.userInput)) {
                    setLocation({ label: newValue.userInput });
                }
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