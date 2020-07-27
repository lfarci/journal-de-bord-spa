import React, { useState } from 'react';

import "./RideForm.css";

import { Button, Container } from '@material-ui/core';

import { LocationField, CommentField, OdometerField, TrafficCondition, TrafficConditionField } from './fields';
import { Ride } from '../../types';

interface IRideFormState {
    isDriving: boolean;
    isValid: boolean;
}

interface IRideFormProps {
    /**
     * Is the form ride.
     */
    model: Ride;
    /**
     * if set to true then the form shows the traffic condition and the comment
     * fields.
     */
    showRetrospectiveField: boolean;
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

function isValid(ride: Ride) {

}

function RideForm(props: IRideFormProps) {
    const [state, setState] = useState<IRideFormState>({isDriving: false, isValid: false});
    return (
        <Container id="ride-form-container">
            {/* TODO: the departure odometer should be smaller */}
            <OdometerField
                id="odometer-value"
                label="Odometer Value"
                placeholder="e.g. 454543"
                hint="Enter the current odometer value of your vehicle."
                value={props.model.departure?.odometerValue}
                onChange={(odometerValue: number) => {console.log("odometer: " + odometerValue)}}
            />
            <LocationField
                id="location-name"
                label="Location"
                placeholder="e.g. Home"
                hint="Enter your current location name"
                options={["Home", "Workplace", "Store", "Library"]}
                value={"Home"}
            />
            {props.showRetrospectiveField && <div>
                <TrafficConditionField
                    id="traffic-condition"
                    label="Traffic condition"
                    hint="Select the option that represent the most the traffic condition of your last ride."
                    value={props.model.trafficCondition}
                    onChange={onTrafficConditionChange}
                />
                <CommentField
                    id="comment"
                    label="Comment"
                    hint="Let us know if you encountered any difficulties during your ride."
                    value={props.model.comment}
                    onChange={onCommentChange}
                />

            </div>}
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {

                }}
            >
                {getSubmitButtonText(props.showRetrospectiveField)}
            </Button>
        </Container>
    );

}

export default RideForm;