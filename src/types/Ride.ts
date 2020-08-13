import { TrafficCondition } from "../components/rides/form/fields";
import { Stop } from "./Stop";

export type Ride = {
    id?: number;
    departure: Stop;
    arrival: Stop | undefined;
    driverPseudonym: string | undefined;
    trafficCondition: TrafficCondition;
    comment: string | undefined;
}