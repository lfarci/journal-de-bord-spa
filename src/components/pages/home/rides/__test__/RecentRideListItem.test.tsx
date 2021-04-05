import { Typography } from '@material-ui/core';
import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import RecentRideListItem from '../RecentRideListItem';
import { makeRecentRide } from './helpers';

describe("<RecentRideListItem />", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RecentRideListItem ride={makeRecentRide()} />, div);
    });

    it("shows the expected title", () => {
        const departure = "Home";
        const arrival = "Work";
        const expectedTitle = "Home to Work";
        const ride = makeRecentRide({ 
            departureLocationName: departure,
            arrivalLocationName: arrival
        });
        const wrapper = shallow(<RecentRideListItem ride={ride} />);
        const titleComponent = wrapper.find(Typography).at(0);
        expect(titleComponent.text()).toBe(expectedTitle);
    });

    it("shows the expected ride distance text", () => {
        const distance = 237;
        const ride = makeRecentRide({ distance: distance })
        const wrapper = shallow(<RecentRideListItem ride={ride} />);
        const distanceTextComponent = wrapper.find(".recent-ride-list-item-end");
        expect(distanceTextComponent.text()).toBe(`${distance} km`);
    });
    
});