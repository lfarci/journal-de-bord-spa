import moment from "moment";
import { isStopBefore } from "../Stop";
import { makeStop } from "./helpers";

describe("isStopBefore", () => {

    const expectStopsWith = (moment: Date, previous: Date) => {
        const stop = makeStop({ moment: moment });
        const previousStop = makeStop({ moment: previous });
        return expect(isStopBefore(stop, previousStop));
    }

    it('returns true when the previous stop is before stop', () => {
        const previous = new Date(2020, 11, 24, 12, 0, 0, 0);
        const current = moment(previous).add(1, 'hours').toDate();
        expectStopsWith(current, previous).toBeTruthy();
    });

    it('returns false when the previous stop is 1 millisecond before stop', () => {
        const previous = new Date(2020, 11, 24, 12, 0, 0, 0);
        const current = moment(previous).add(1, 'millisecond').toDate();
        expectStopsWith(current, previous).toBeFalsy();
    });

    it('returns false when the previous stop is 1 second before stop', () => {
        const previous = new Date(2020, 11, 24, 12, 0, 0, 0);
        const current = moment(previous).add(1, 'millisecond').toDate();
        expectStopsWith(current, previous).toBeFalsy();
    });

    it('returns true when the previous stop is 1 minute before stop', () => {
        const previous = new Date(2020, 11, 24, 12, 0, 0, 0);
        const current = moment(previous).add(1, 'minute').toDate();
        expectStopsWith(current, previous).toBeTruthy();
    });

    it('returns true when the previous stop is 1 hour before stop', () => {
        const previous = new Date(2020, 11, 24, 12, 0, 0, 0);
        const current = moment(previous).add(1, 'hour').toDate();
        expectStopsWith(current, previous).toBeTruthy();
    });

});