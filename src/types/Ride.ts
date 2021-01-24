import { TrafficCondition } from "../components/pages/rides/form/fields/TrafficConditionField";
import { Stop } from "./Stop";

export type Ride = {
    id?: number;
    departure: Stop;
    arrival: Stop | undefined;
    driverPseudonym: string | undefined;
    trafficCondition: TrafficCondition;
    comment: string | undefined;
}

export function getRideDistance(ride: Ride) {
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