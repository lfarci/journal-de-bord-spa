import { Ride, Stop } from "..";
import { getRideDistance } from "../Ride";
import { makeRide, makeStop } from "./helpers";

export {};


describe("getDistance", () => {

    it('returns zero when the odometers values are the same', () => {
        const departure: Stop = makeStop({odometerValue: 10000});
        const arrival: Stop = makeStop({odometerValue: 10000});
        const ride: Ride = makeRide({departure: departure, arrival: arrival});
        expect(getRideDistance(ride)).toBe(0);
    });

    it('returns the difference between departure and arrival', () => {
        const departure: Stop = makeStop({odometerValue: 10000});
        const arrival: Stop = makeStop({odometerValue: 10100});
        const ride: Ride = makeRide({departure: departure, arrival: arrival});
        expect(getRideDistance(ride)).toBe(100);
    });

    it('throws an error when the given ride has no arrival', () => {
        const ride: Ride = makeRide({arrival: undefined});
        expect(() => getRideDistance(ride)).toThrowError();
    });

    it('throws an error when the arrival odometer is smaller than departure', () => {
        const departure: Stop = makeStop({odometerValue: 10000});
        const arrival: Stop = makeStop({odometerValue: 9999});
        const ride: Ride = makeRide({departure: departure, arrival: arrival});
        expect(() => getRideDistance(ride)).toThrowError();
    });

});