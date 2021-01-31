import moment from "moment";
import { Ride, Stop, Location } from "..";

export function makeLocation(location: Partial<Location> = {}): Location {
    if (location === undefined) location = {};
    return { name: "Location", longitude: 0.0, latitude: 0.0, ...location};
}

export function makeStop(stop: Partial<Stop> = {}): Stop {
    const stopLocation = makeLocation(stop.location);
    return {
		location: stopLocation,
		moment: new Date(),
        odometerValue: 0,
        ...stop
	}
}

export function makeRide(ride: Partial<Ride> = {}): Ride {
    const departure = makeStop(ride.departure);
    const arrival = makeStop(ride.arrival);
    return {
        id: 0,
        departure: departure,
        arrival: arrival,
        comment: "Comment",
        trafficCondition: 0,
        driverPseudonym: "User",
        ...ride
    };
}

export const makeValidRide = (): Ride => {
    const departureDate = new Date(2020, 11, 24, 12, 0, 0, 0);
    const arrivalDate = moment(departureDate).add(1, 'hour').toDate();
    const departure = makeStop({ moment: departureDate, odometerValue: 10000});
    const arrival = makeStop({ moment: arrivalDate, odometerValue: 10012});
    return makeRide({
        departure: departure, 
        arrival: arrival,
        trafficCondition: 1,
        comment: "This is a valid comment"
    });
}