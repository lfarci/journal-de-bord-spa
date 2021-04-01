import { Driver } from ".";

export type DriverStatistics = {
    driver: Driver;
    totalDistance: number;
    rides: number;
    locations: number;
}