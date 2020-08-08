import React, { useState } from 'react';

import "./RideForm.css";

import { Button, Container, Typography, Divider } from '@material-ui/core';

import { CommentField, TrafficConditionField, TrafficCondition } from './fields';
import { Ride, Stop } from '../../types';
import StopForm from './StopForm';

interface IRideFormProps {
    /**
     * Is the form ride.
     */
    ride: Ride;
    /**
     * if set to true then the form shows arrival and retrospective ones.
     */
    isDriving: boolean;
    /**
     * Called when the form values are changed.
     *
     * @param data is the updated data.
     */
    onChange: (data: Ride) => void;
    /**
     * Called when the submit button is clicked. data contain the data
     * submitted by the user.
     */
    onSubmit: (data: Ride) => void;
}

function getSubmitButtonText(isDriving: boolean): string {
    return isDriving ? "Finish" : "Start";
}

function RideForm(props: IRideFormProps) {

    const [ride, setRide] = useState<Ride>(props.ride);

    return (
        <Container id="ride-form-container">
            {/* TODO: the departure odometer should be smaller */}
            {/* TODO: the departure should be before arrival */}
            <StopForm
                title="Departure"
                value={props.ride.departure}
                onChange={(data: Stop) => {
                    const newRide = {...ride};
                    newRide.departure = {...data};
                    setRide(newRide);
                }}
            />
            {props.isDriving && <div>
                <StopForm
                    title="Arrival"
                    value={props.ride.arrival!!}
                    onChange={(data: Stop) => {
                        const newRide = {...ride};
                        newRide.arrival = {...data};
                        setRide(newRide);
                    }}
                />
                <Typography variant="h6">Retrospective</Typography>
                <Divider />
                <TrafficConditionField
                    id="traffic-condition"
                    label="Traffic condition"
                    hint="Select the option that represent the best the traffic condition of your last ride."
                    value={props.ride.trafficCondition}
                    onChange={(data: TrafficCondition) => {
                        const newRide = {...ride};
                        newRide.trafficCondition = data;
                        setRide(newRide);
                    }}
                />
                <CommentField
                    id="comment"
                    label="Comment"
                    hint="Let us know if you encountered any difficulties during your ride."
                    value={props.ride.comment}
                    onChange={(data: string) => {
                        const newRide = {...ride};
                        newRide.comment = data;
                        setRide(newRide);
                    }}
                />
            </div>}
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => props.onSubmit(ride)}
            >
                {getSubmitButtonText(props.isDriving)}
            </Button>
        </Container >
    );

}

export default RideForm;