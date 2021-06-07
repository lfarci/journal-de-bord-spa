import React, { useEffect, useState } from 'react';

import { LocationField, OdometerField } from './fields';
import { Location } from '../../../../types';
import DatetimeField from './fields/DatetimeField';
import { Typography, Divider } from '@material-ui/core';
import LocationService from '../../../../services/LocationService';
import { StopData } from '../../../../services/StopService';
import { useCallback } from 'react';
import { getMomentLocalISOString } from '../../../../types/Stop';

interface IStopFormProps {
    title?: string;
    description?: string;
    odometerMin?: number;
    momentMin?: Date;
    value?: StopData
    onChange: (data: StopData) => void;
    datetime?: boolean;
    availableLocations?: Location[];
    onError?: (error: Error) => void;
    onOdometerChange?: (value: number) => void;
}

/**
 * The fields are used to describe a stop. A stop is made of a moment, a
 * location and an odometer value.
 *
 * @param props aree the components properties.
 */
function StopForm(props: IStopFormProps) {

    const { onChange: handleStopChange } = props;
    const hasTitle = () => props.title !== undefined;
    const showDateTime = () => props.datetime === undefined ? false : props.datetime;
    const getOdometerMin = () => props.odometerMin === undefined ? 0 : props.odometerMin;
    const getDefaultMoment = () => props.value ? new Date(props.value.moment) : new Date();
    const getDefaultOdometer = () => props.value ? props.value.odometerValue : 0;

    const [moment, setMoment] = useState<Date>(getDefaultMoment());
    const [odometer, setOdometer] = useState<number>(getDefaultOdometer());
    const [locationId, setLocationId] = useState<number | undefined>(undefined);
    const [locations, setLocations] = useState<Location[]>([]);

    const { id: stopId } = { ...props.value };
    const { onError } = { ...props };

    const fetchAvailableLocations = useCallback(async () => {
        try {
            const data: Location[] = await LocationService.getAll();
            setLocations(data);
            if (locationId === undefined && data.length > 0) {
                setLocationId(data[0].id);
            }
        } catch (error) {
            if (onError) onError(error as Error);
        }
    }, [onError, locationId]);

    const handleOdometerChange = (value: number) => {
        setOdometer(value);
        if (props.onOdometerChange) props.onOdometerChange(value);
    };


    useEffect(() => {
        fetchAvailableLocations();
        if (locationId !== undefined && moment !== undefined) {
            handleStopChange({
                id: stopId ? stopId : undefined,
                moment: getMomentLocalISOString(new Date()),
                locationId: locationId,
                odometerValue: odometer
            });
        }

    }, [moment, odometer, locationId, handleStopChange, onError, stopId, fetchAvailableLocations]);

    return (
        <div>
            {
                hasTitle() && <div>
                    <Typography variant="h6">{props.title}</Typography>
                    <Divider />
                </div>
            }
            <OdometerField
                id="stop-odometer-value"
                label="Odometer Value"
                placeholder="e.g. 454543"
                hint="Enter the current odometer value of your vehicle."
                value={odometer}
                min={getOdometerMin()}
                onChange={handleOdometerChange}
            />
            <LocationField
                id="stop-location"
                label="Location"
                placeholder="e.g. Home"
                hint="Enter your current location name"
                options={locations}
                value={locationId === undefined ? -1 : locationId}
                onLocationCreated={fetchAvailableLocations}
                onChange={setLocationId}
            />
            {showDateTime() && <DatetimeField
                id="stop-datetime"
                label="Date and time"
                hint="Enter the stop date and time."
                min={props.momentMin}
                value={moment}
                onChange={setMoment}
            />}
        </div>
    );
}

export default StopForm;