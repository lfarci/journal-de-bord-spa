import { Location } from "./Location";

export type Stop = {
    moment: Date;
    location: Location;
    odometerValue: number;
};