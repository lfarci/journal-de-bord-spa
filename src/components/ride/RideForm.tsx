import React from 'react';

import "./RideForm.css";

import { Button, Container } from '@material-ui/core';

import { LocationField, CommentField, OdometerField, TrafficCondition, TrafficConditionField } from './fields';

interface IRideFormState {
    isRideInProgress: boolean;
}

function onTrafficConditionChange(event: React.ChangeEvent<any>) {
    console.log("Traffic condition: " + event.target.value);
}

function onCommentChange(event: React.ChangeEvent<any>) {
    console.log("Comment: " + event.target.value);
}

class RideForm extends React.Component<{}, IRideFormState> {

    constructor(props: {}) {
        super(props);
        this.state = { isRideInProgress: false };
    }

    render() {
        return (
            <Container id="ride-form-container">
                {/* TODO: the departure odometer should be smaller */}
                <OdometerField
                    id="odometer-value"
                    label="Odometer Value"
                    placeholder="e.g. 454543"
                    hint="Enter the current odometer value of your vehicle."
                />
                <LocationField
                    id="location-name"
                    label="Location"
                    placeholder="e.g. Home"
                    hint="Enter your current location name"
                    options={["Home", "Workplace", "Store", "Library"]}
                />
                {this.state.isRideInProgress && <div>
                    <TrafficConditionField
                        id="traffic-condition"
                        label="Traffic condition"
                        hint="Select the option that represent the most the traffic condition of your last ride."
                        value={TrafficCondition.NORMAL}
                        onChange={onTrafficConditionChange}
                    />
                    <CommentField
                        id="comment"
                        label="Comment"
                        hint="Let us know if you encountered any difficulties during your ride."
                        value={undefined}
                        onChange={onCommentChange}
                    />

                </div>}
                <Button variant="contained" color="primary" size="large">Start</Button>
            </Container>
        );
    }

}

export default RideForm;