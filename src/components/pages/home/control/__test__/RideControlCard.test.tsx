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
            onRideStarted={() => console.log("Start a new ride")}
            onCancelRide={() => console.log("Cancel a new ride")}
            onFinishRide={() => console.log("Finish a new ride")}
        />, div);
    });

    it("only renders the start tracking action when tracking is false", () => {
        const wrapper = shallow(<RideControlCard
            tracking={false}
            departureLocationName="Brussels"
            trackingMilliseconds={3600000}
        />);
        const start = wrapper.find('RideControlCardAction').at(0);
        expect(start.prop("text")).toBe("Start tracking");
    });

    it("renders the cancel action when tracking is true", () => {
        const wrapper = shallow(<RideControlCard
            tracking={true}
            departureLocationName="Brussels"
            trackingMilliseconds={3600000}
        />);
        const start = wrapper.find('RideControlCardAction').at(0);
        expect(start.prop("text")).toBe("Cancel");
    });

    it("renders the finish tracking action when tracking is true", () => {
        const wrapper = shallow(<RideControlCard
            tracking={true}
            departureLocationName="Brussels"
            trackingMilliseconds={3600000}
        />);
        const start = wrapper.find('RideControlCardAction').at(1);
        expect(start.prop("text")).toBe("Finish tracking");
    });

});
