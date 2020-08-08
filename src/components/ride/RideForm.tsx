import React, { useState } from 'react';

import "./RideForm.css";

import { Button, Container, Typography, Divider } from '@material-ui/core';

import { CommentField, TrafficConditionField } from './fields';
import { Ride, Stop, Location } from '../../types';
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
     * Called when the submit button is clicked. data contain the data
     * submitted by the user.
     */
    onSubmit: (data: Ride) => void;
}

function onTrafficConditionChange(event: React.ChangeEvent<any>) {
    console.log("Traffic condition: " + event.target.value);
}

function onCommentChange(event: React.ChangeEvent<any>) {
    console.log("Comment: " + event.target.value);
}

function getSubmitButtonText(isDriving: boolean): string {
    return isDriving ? "Finish" : "Start";
}


function RideForm(props: IRideFormProps) {

    const [] = useState<number>(0);
    const [] = useState<boolean>(false);
    const [] = useState<boolean>(false);

    const isDepartureOnly = () => props.ride.arrival != null;

    return (
        <Container id="ride-form-container">
            {/* TODO: the departure odometer should be smaller */}
            <StopForm
                title="Departure"
                description="Please enter the information relative to the ride departure."
                value={props.ride.departure}
                onChange={(data: Stop) => {
                    console.log("New stop: " + JSON.stringify(data, null, 2));
                }}
            />
            {props.isDriving && <div>
                <StopForm
                    title="Arrival"
                    value={props.ride.arrival!!}
                    onChange={(data: Stop) => {
                        console.log("New stop: " + JSON.stringify(data, null, 2));
                    }}
                />
                <Typography variant="h6">Retrospective</Typography>
                <Divider />
                <TrafficConditionField
                    id="traffic-condition"
                    label="Traffic condition"
                    hint="Select the option that represent the most the traffic condition of your last ride."
                    value={props.ride.trafficCondition}
                    onChange={onTrafficConditionChange}
                />
                <CommentField
                    id="comment"
                    label="Comment"
                    hint="Let us know if you encountered any difficulties during your ride."
                    value={props.ride.comment}
                    onChange={onCommentChange}
                />
            </div>}
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => props.onSubmit(props.ride)}
            >
                {getSubmitButtonText(props.isDriving)}
            </Button>
        </Container >
    );

}

export default RideForm;