import moment from "moment";
import { TrafficCondition } from "../components/pages/rides/form/fields/TrafficConditionField";
import { Stop } from "./Stop";

const humanizeDuration = require("humanize-duration");

export type Ride = {
    id?: number;
    departure: Stop;
    arrival: Stop | undefined;
    driverPseudonym: string | undefined;
    trafficCondition: TrafficCondition;
    comment: string | undefined;
}

export const getRideDistance = (ride: Ride) => {
    if (ride.arrival === undefined) {
        throw Error("Cannot read distance without an arrival");
    }
    const departureOdometer = ride.departure.odometerValue;
    const arrivalOdometer = ride.arrival?.odometerValue;
    if (arrivalOdometer < departureOdometer) {
        throw Error("The arrival is smaller than the departure odometer");
    }
    return arrivalOdometer - departureOdometer;
}

export const getRideDistanceString = (ride: Ride): string => {
    let distance: number;
    try {
        distance = getRideDistance(ride);
    } catch (error) {
        distance = 0;
    }
    return `${distance.toString()} km`;
}

export const getRideDuration = (ride: Ride): number => {
    if (ride.arrival === undefined) {
        throw Error("Cannot read duration without an arrival");
    }
    const departure = moment(ride.departure.moment);
    const arrival = moment(ride.arrival?.moment);
    return moment.duration(arrival.diff(departure)).asMilliseconds();
}

export const getRideDurationString = (ride: Ride): string => {
    try {
        const milliseconds = getRideDuration(ride);
        return humanizeDuration(milliseconds, {
            round: true,
            units: ['y', 'mo', 'd', 'h', 'm'],
            largest: 1,
        })
    } catch (error) {
        return "Error";
    }
}