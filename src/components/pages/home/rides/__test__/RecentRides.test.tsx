import React from 'react';
import { mount, shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import RecentRideListItem from '../RecentRideListItem';
import RecentRides from '../RecentRides';
import { makeRecentRides } from './helpers';

describe("<RecentRides />", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RecentRides rides={[]} />, div);
    });

    it("shows a no content message when the rides array is empty", () => {
        const wrapper = shallow(<RecentRides rides={[]} />);
        expect(wrapper.exists(".home-rides-card-empty")).toBeTruthy();
    });
    
    it("shows the expected number of rides", () => {
        const numberOfRides = 15;
        const wrapper = mount(<RecentRides rides={makeRecentRides(numberOfRides)} />);
        const recentRidesElements = wrapper.find(RecentRideListItem);
        expect(recentRidesElements).toHaveLength(numberOfRides);
    });

    it("shows the expected number of rides", () => {
        const numberOfRides = 15;
        const recentRides = makeRecentRides(numberOfRides);
        const wrapper = mount(<RecentRides rides={recentRides} />);
        recentRides.forEach(recentRide => {
            expect(wrapper.exists({ ride: recentRide })).toBeTruthy();
        });
    });

});