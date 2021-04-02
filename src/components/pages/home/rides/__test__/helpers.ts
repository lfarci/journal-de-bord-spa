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