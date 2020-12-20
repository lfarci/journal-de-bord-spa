import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import RideControlCardTitle, { BaseTitle, ComputedTitle } from "../RideControlCardTitle";

describe("<RideControlCardTitle />", () => {

    it('renders without crashing as a base title', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RideControlCardTitle text="My Amazing Title" />, div);
    });

    it('renders without crashing as a computed title', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RideControlCardTitle
            locationName="Brussels"
            trackingMilliseconds={360000}
        />, div);
    });

    it("renders a BaseTitle when the text props is specified", () => {
        const wrapper = shallow(<RideControlCardTitle text="My Random Text"/>);
        expect(wrapper.find('BaseTitle')).toHaveLength(1);
    });

    it("doesn\'t render a ComputedTitle when the text props is specified", () => {
        const wrapper = shallow(<RideControlCardTitle text="My Random Text"/>);
        expect(wrapper.find('ComputedTitle')).toHaveLength(0);
    });

    it("renders a ComputedTitle when the locationName and trackingMilliseconds props are specified", () => {
        const wrapper = shallow(<RideControlCardTitle
            locationName="Brussels"
            trackingMilliseconds={360000}
        />);
        expect(wrapper.find('ComputedTitle')).toHaveLength(1);
    });

});