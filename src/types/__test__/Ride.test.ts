import moment, { DurationInputArg2 } from "moment";
import { Ride, Stop } from "..";
import { getRideDistance, getRideDuration, isValidRide } from "../Ride";
import { makeRide, makeStop, makeValidRide } from "./helpers";

describe("isValidRide", () => {

    const invalidateDeparture = (ride: Ride, amount: number, unit: DurationInputArg2) => {
        const arrivalMoment = moment(ride.arrival?.moment);
        const departureMoment = arrivalMoment.add(amount, unit);
        ride.departure.moment = departureMoment.toDate();
        return ride;
    }

    const invalidateArrival = (ride: Ride, amount: number, unit: DurationInputArg2) => {
        const departureMoment = moment(ride.departure.moment);
        const arrivalMoment = departureMoment.add(amount, unit);
        if (ride.arrival) {
            ride.arrival.moment = arrivalMoment.toDate();
        }
        return ride;
    }

    const invalidateOdometer = (ride: Ride, amount: number) => {
        if (ride.arrival) {
            ride.departure.odometerValue = ride.arrival?.odometerValue + amount;
        }
        return ride;
    }

    it('returns true when the ride is valid', () => {
        expect(isValidRide(makeValidRide())).toBeTruthy();
    });

    it('returns false when the ride departure is one millisecond before arrival', () => {
        const valid = makeValidRide();
        expect(isValidRide(invalidateArrival(valid, 1, 'millisecond'))).toBeFalsy();
    });

    it('returns false when the ride departure is one second before arrival', () => {
        const valid = makeValidRide();
        expect(isValidRide(invalidateArrival(valid, 1, 'second'))).toBeFalsy();
    });

    it('returns true when the ride departure is one minute before arrival', () => {
        const valid = makeValidRide();
        expect(isValidRide(invalidateArrival(valid, 1, 'minute'))).toBeTruthy();
    });

    it('returns false when the ride departure is one millisecond after arrival', () => {
        const valid = makeValidRide();
        expect(isValidRide(invalidateDeparture(valid, 1, 'millisecond'))).toBeFalsy();
    });

    it('returns false when the ride departure is one second after arrival', () => {
        const valid = makeValidRide();
        expect(isValidRide(invalidateDeparture(valid, 1, 'second'))).toBeFalsy();
    });

    it('returns false when the ride departure is one minute after arrival', () => {
        const valid = makeValidRide();
        expect(isValidRide(invalidateDeparture(valid, 1, 'minute'))).toBeFalsy();
    });

    it('returns false when the ride departure odometer is bigger than arrival', () => {
        const valid = makeValidRide();
        expect(isValidRide(invalidateOdometer(valid, 1))).toBeFalsy();
    });

});

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