import React from 'react';
import ReactDOM from 'react-dom';
import RecentRidesCard, { RecentRidesSkeleton } from '../RecentRidesCard';
import { RecentRide } from '../../../../../types';
import { mount, ReactWrapper, shallow } from 'enzyme';
import { makeRecentRides, waitForUpdate } from './helpers';
import { getRecentRides } from '../../../../../services/Rides';
import { act } from 'react-dom/test-utils';
import RecentRides from '../RecentRides';
import RecentRideListItem from '../RecentRideListItem';
import DriverService, { hasCurrentUserADriver } from '../../../../../services/DriverService';

jest.mock('../../../../../services/Rides', () => ({ getRecentRides: jest.fn() }));
jest.mock('../../../../../services/DriverService', () => ({ hasCurrentUserADriver: jest.fn() }));

const mountUpdatedRecentRidesCard = async (
    props: { title: string, size: number} = { title: "Recent rides", size: 5 }
): Promise<ReactWrapper> => {
    return new Promise(async (resolve) => {
        const wrapper = mount(<RecentRidesCard {...props} />);
        await waitForUpdate(wrapper);
        resolve(wrapper);
    });
};

const mountRecentRidesCardWith = async (
    recentRides: RecentRide[],
    size: number = 5,
    title: string = "Recent rides"
): Promise<ReactWrapper> => {
    return new Promise(async (resolve) => {
        (hasCurrentUserADriver as jest.Mock).mockResolvedValue(true);
        (getRecentRides as jest.Mock).mockResolvedValue(recentRides);
        const wrapper = mountUpdatedRecentRidesCard({title: title, size: size});
        resolve(wrapper);
    });
}

describe("<RecentRidesCard />", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RecentRidesCard title="Title" />, div);
    });

    it('renders the expected title', () => {
        const title = "My title";
        const wrapper = shallow(<RecentRidesCard title={title} />);
        const titleElement = wrapper.find(".home-rides-card-title");
        expect(titleElement.text()).toBe(title);
    });

    it('renders the given number of rides', async () => {
        const requestedSize = 5;
        const rides = makeRecentRides(requestedSize);
        const wrapper = await mountRecentRidesCardWith(rides, requestedSize);
        const recentRides = wrapper.find(RecentRides);
        expect(recentRides.find(RecentRideListItem)).toHaveLength(requestedSize);
    });

    it('renders the list of rides when they are loaded successfully', async () => {
        const rides = makeRecentRides(10);
        const wrapper = await mountRecentRidesCardWith(rides);
        expect(wrapper.exists(RecentRides)).toBeTruthy();
    });

    it('does not renders a no content message when some rides are loaded', async () => {
        const rides = makeRecentRides(10);
        const wrapper = await mountRecentRidesCardWith(rides);
        expect(wrapper.exists(".home-rides-card-empty")).toBeFalsy();
    });

    it('renders the list of rides when there are no rides', async () => {
        const wrapper = await mountRecentRidesCardWith([]);
        expect(wrapper.exists(RecentRides)).toBeTruthy();
    });

    it('renders a no content message when no rides are loaded', async () => {
        const wrapper = await mountRecentRidesCardWith([]);
        expect(wrapper.exists(".home-rides-card-empty")).toBeTruthy();
    });

    it('renders an error message when the recent rides could not be loaded', async () => {
        (hasCurrentUserADriver as jest.Mock).mockResolvedValue(true);
        (getRecentRides as jest.Mock).mockRejectedValue(new Error());
        const wrapper = await mountUpdatedRecentRidesCard();
        expect(wrapper.exists(".home-rides-card-error")).toBeTruthy();
    });

    it('renders recent rides skeleton when loading', async () => {
        (getRecentRides as jest.Mock).mockRejectedValue([]);
        const wrapper = mount(<RecentRidesCard title="Recent rides" />);
        await act(async () => { await Promise.resolve(wrapper); });
        expect(wrapper.exists(RecentRidesSkeleton)).toBeTruthy();
    });

});