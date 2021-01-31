import moment from "moment";
import { TrafficCondition } from "../components/pages/rides/form/fields/TrafficConditionField";
import { isStopBefore, Stop } from "./Stop";

const humanizeDuration = require("humanize-duration");

export type Ride = {
    id?: number;
    departure: Stop;
    arrival: Stop | undefined;
    driverPseudonym: string | undefined;
    trafficCondition: TrafficCondition;
    comment: string | undefined;
}

/**
 * Tells if a ride is valid. A ride is valid when:
 *
 * - Its departure date is before its arrival date (minute precision).
 * - Its departure odometer is smaller than its arrival odometer.
 *
 * @param ride is a valid ride.
 * @returns true if the specified ride is valid.
 */
export const isValidRide = (ride: Ride): boolean => {
    return ride.arrival !== undefined 
        && isStopBefore(ride.arrival, ride.departure)
        && ride.departure.odometerValue < ride.arrival.odometerValue;
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

export const getTrafficConditionString = (condition: TrafficCondition): string => {
    let trafficConditionString: string;
    switch (condition) {
    case TrafficCondition.VERY_CALM:
        trafficConditionString = "Very calm";
        break;
    case TrafficCondition.CALM:
        trafficConditionString = "Calm";
        break;
    case TrafficCondition.NORMAL:
        trafficConditionString = "Normal";
        break;
    case TrafficCondition.SLOW:
        trafficConditionString = "Slow";
        break;
    case TrafficCondition.VERY_SLOW:
        trafficConditionString = "Very slow";
        break;
    }
    return trafficConditionString;
}