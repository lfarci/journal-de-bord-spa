import moment from "moment";
import { Location } from "./Location";

export type Stop = {
    id?: number;
    moment: Date;
    location: Location;
    odometerValue: number;
};

export const isStopBefore = (stop: Stop, previousStop: Stop): boolean => {
    // return moment(previousStop.moment).isBefore(moment(stop.moment));
    const a = moment(previousStop.moment).second(0).milliseconds(0);
    const b = moment(stop.moment).second(0).milliseconds(0);
    console.log(stop.moment.toISOString(), previousStop.moment.toISOString(), a.toDate().getTime() < b.toDate().getTime());
    return a.toDate().getTime() < b.toDate().getTime();
}