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
        rides.push(makeRecentRide( { id: i }));
    }
    return rides;
};