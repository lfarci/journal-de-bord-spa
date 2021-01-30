import React, { useEffect, useState } from 'react';

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
    /**
     * This defines the available locations. Available locations are the ones
     * that the user has visited in the past. They will be used in a combo box.
     */
    availableLocations?: Location[];
}

/**
 * The fields are used to describe a stop. A stop is made of a moment, a
 * location and an odometer value.
 *
 * @param props aree the components properties.
 */
function StopForm(props: IStopFormProps) {

    const DEFAULT_LOCATION = { name: "Home", latitude: 0.0, longitude: 0.0 };

    const { onChange: handleStopChange } = props;
    const hasTitle = () => props.title !== undefined;
    const showDateTime = () => props.datetime === undefined ? false : props.datetime;
    const getLocations = () => props.availableLocations === undefined ? [] : props.availableLocations;

    const getDefaultMoment = () => props.value ? props.value.moment : new Date();
    const getDefaultOdometer = () => props.value ? props.value.odometerValue : 0;
    const getDefaultLocation = () => {
        if (props.value) return props.value.location;
        const locations = getLocations();
        return locations.length === 0 ? DEFAULT_LOCATION : locations[0];
    };

    const [moment, setMoment] = useState<Date>(getDefaultMoment());
    const [odometer, setOdometer] = useState<number>(getDefaultOdometer());
    const [location, setLocation] = useState<Location>(getDefaultLocation());

    useEffect(() => {
        handleStopChange({
            moment: moment,
            location: location,
            odometerValue: odometer
        });
    }, [moment, odometer, location, handleStopChange]);

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
                value={odometer}
                onChange={setOdometer}
            />
            <LocationField
                id="stop-location"
                label="Location"
                placeholder="e.g. Home"
                hint="Enter your current location name"
                options={getLocations()}
                value={location}
                onChange={setLocation}
            />
            { showDateTime() && <DatetimeField
                id="stop-datetime"
                label="Date and time"
                hint="Enter the stop date and time."
                value={moment}
                onChange={setMoment}
            />}
        </div>
    );
}

export default StopForm;