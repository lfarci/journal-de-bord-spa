import { ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { RecentRide } from "../../../../../types";

export function makeRecentRide(ride: Partial<RecentRide> = {}): RecentRide {
    return {
        id: 0,
        departureLocationName: "Home",
        arrivalLocationName: "Work",
        distance: 24,
        date: new Date(),
        ...ride
    };
}

export const makeRecentRides = (sampleSize: number = 5): RecentRide[] => {
    const rides = [];
    for (let i = 0; i < sampleSize; i++) {
        rides.push(makeRecentRide({ id: i }));
    }
    return rides;
};

/**
 * This can be used to make sure that the given wrapped component has updated
 * its state before rendering.
 * 
 * This solution was found on StackOverflow:
 * https://stackoverflow.com/questions/57006369/testing-asynchronous-useeffect
 * 
 * @param wrapper this is the result of the enzyme's mount function.
 * @returns a promise to await for.
 */
export const waitForUpdate = async (wrapper: ReactWrapper) => {
    return act(async () => {
        await Promise.resolve(wrapper);
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update()
    });
}