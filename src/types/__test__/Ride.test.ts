import { Ride, Stop } from "..";
import { getRideDistance, getRideDuration } from "../Ride";
import { makeRide, makeStop } from "./helpers";

describe("getRideDistance", () => {

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

describe("getRideDuration", () => {

    const MILLISECONDS_IN_MINUTE = 1000 * 60;

    it('returns zero when the moments are the same', () => {
        const departure: Stop = makeStop({moment: new Date(2020, 1, 1, 12, 45)});
        const arrival: Stop = makeStop({moment: new Date(2020, 1, 1, 12, 45)});
        const ride: Ride = makeRide({departure: departure, arrival: arrival});
        expect(getRideDuration(ride)).toBe(0);
    });

    it('returns the difference between departure and arrival', () => {
        const departure: Stop = makeStop({moment: new Date(2020, 1, 1, 12, 45)});
        const arrival: Stop = makeStop({moment: new Date(2020, 1, 1, 13, 0)});
        const ride: Ride = makeRide({departure: departure, arrival: arrival});
        const expectedResult = MILLISECONDS_IN_MINUTE * 15;
        expect(getRideDuration(ride)).toBe(expectedResult);
    });

    it('throws an error when the given ride has no arrival', () => {
        const ride: Ride = makeRide({arrival: undefined});
        expect(() => getRideDuration(ride)).toThrowError();
    });

});