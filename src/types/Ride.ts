import { TrafficCondition } from "../components/rides/fields";
import { Stop } from "./Stop";

export type Ride = {
    departure: Stop;
    arrival: Stop | undefined;
    driverPseudonym: string | undefined;
    trafficCondition: TrafficCondition;
    comment: string | undefined;
}