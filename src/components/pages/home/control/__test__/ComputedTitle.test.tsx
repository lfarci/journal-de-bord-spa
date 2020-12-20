import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import { ComputedTitle, computeStatusTitle } from "../RideControlCardTitle";

describe("<ComputedTitle />", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ComputedTitle
            locationName="Brussels"
            trackingMilliseconds={360000}
        />, div);
    });

    it('renders a BaseTitle component', () => {
        const wrapper = shallow(<ComputedTitle
            locationName="Brussels"
            trackingMilliseconds={360000}
        />);
        expect(wrapper.find('BaseTitle')).toHaveLength(1);
    });

});

describe("computeStatusTitle", () => {

    const MINUTE = 60 * 1000;
    const HOUR = 3600000;

    it("computes a title as expected when locationName and duration are valid", () => {
        const expected = "You left brussels 1 hour ago";
        expect(computeStatusTitle("Brussels", HOUR)).toBe(expected);
    });

    it("shows locationName as lower case when it is all caps", () => {
        const expected = "You left brussels 1 hour ago";
        expect(computeStatusTitle("BRUSSELS", HOUR)).toBe(expected);
    });

    it("shows locationName as lower case when the first letter is capitalized", () => {
        const expected = "You left brussels 1 hour ago";
        expect(computeStatusTitle("Brussels", HOUR)).toBe(expected);
    });

    it("ignores locationName when locationName is empty", () => {
        const expected = "You left 1 hour ago";
        expect(computeStatusTitle("", HOUR)).toBe(expected);
    });

    it("reads the duration as positive when trackingMilliseconds is negative", () => {
        const expected = "You left 1 hour ago";
        expect(computeStatusTitle("", -HOUR)).toBe(expected);
    });

    it("rounds to minutes when the duration is less than a minute", () => {
        const expected = "You left 1 minute ago";
        expect(computeStatusTitle("", 32 * 1000)).toBe(expected);
    });

    it("shows only minutes when the duration is less than an hour", () => {
        const expected = "You left 32 minutes ago";
        expect(computeStatusTitle("", 32 * MINUTE)).toBe(expected);
    });

    it("shows only minutes when the duration is 59 minutes", () => {
        const expected = "You left 59 minutes ago";
        expect(computeStatusTitle("", 59 * MINUTE)).toBe(expected);
    });

    it("shows only hours when the duration is equal to 23 hours", () => {
        const expected = "You left 23 hours ago";
        expect(computeStatusTitle("", 23 * HOUR)).toBe(expected);
    });

    it("shows only day ago when the duration is equal to 24 hours", () => {
        const expected = "You left 1 day ago";
        expect(computeStatusTitle("", 24 * HOUR)).toBe(expected);
    });

    it("shows only days ago when the duration is equal to 1000 days", () => {
        const expected = "You left 1000 days ago";
        expect(computeStatusTitle("", 1000 * 24 * HOUR)).toBe(expected);
    });

});