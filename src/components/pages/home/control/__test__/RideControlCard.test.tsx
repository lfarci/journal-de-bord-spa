import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import RideControlCard from "../RideControlCard";

describe("<RideControlCard />", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RideControlCard tracking
            departureLocationName="WORK"
            trackingMilliseconds={ 3600000 * 24}
            onStartRide={() => console.log("Start a new ride")}
            onCancelRide={() => console.log("Cancel a new ride")}
            onFinishRide={() => console.log("Finish a new ride")}
        />, div);
    });

    it("renders the start title when tracking is set to false", () => {});

    it("renders the start description when tracking is set to false", () => {});

    it("only renders the start tracking action when tracking is false", () => {});

    it("It renders a generic title when the departure location is empty", () => {});

    it("renders the tracking description when tracking is true", () => {});

    it("renders cancel and finish actions when tracking is true", () => {});

});
