import { Location } from "./Location";

export type Stop = {
    id?: number;
    moment: Date;
    location: Location;
    odometerValue: number;
};