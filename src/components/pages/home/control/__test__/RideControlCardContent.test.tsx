import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import RideControlCardContent from "../RideControlCardContent";
import { Typography } from "@material-ui/core";

describe("<RideControlCardContent />", () => {

    it('renders without crashing as a base content', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RideControlCardContent
            title="Title"
            description="Description"
        />, div);
    });

    it('renders without crashing as a tracking content', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RideControlCardContent
            locationName="Brussels"
            trackingMilliseconds={3600000}
            description="Description"
        />, div);
    });

});
