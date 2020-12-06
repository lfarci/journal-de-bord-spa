import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import RideControlCardContent from "../RideControlCardContent";
import { Typography } from "@material-ui/core";

describe("<RideControlCardContent />", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RideControlCardContent
            title="Title"
            description="Description"
        />, div);
    });

    it('renders with the specified title', () => {
        const title = "Ride Control Card Content";
        const cardContent = shallow(<RideControlCardContent title={title}/>);
        expect(cardContent.first().text()).toBe(title);
    });

    it('renders with the specified description', () => {
        const title = "Ride Control Card Content";
        const description = "Ride Control Card Content Description";
        const cardContent = shallow(<RideControlCardContent
            title={title}
            description={description}
        />);
        expect(cardContent.find(Typography).at(1).text()).toBe(description);
    });

    it('renders only one Typography when the description is not specified', () => {
        const title = "Ride Control Card Content";
        const cardContent = shallow(<RideControlCardContent title={title} />);
        expect(cardContent.find(Typography)).toHaveLength(1);
    });

    it('renders a second Typography when a description is specified', () => {
        const title = "Ride Control Card Content";
        const description = "Ride Control Card Content Description";
        const cardContent = shallow(<RideControlCardContent
            title={title}
            description={description}
        />);
        expect(cardContent.find(Typography)).toHaveLength(2);
    });

    it('renders only one Typography when the description is empty', () => {
        const title = "Ride Control Card Content";
        const cardContent = shallow(<RideControlCardContent
            title={title}
            description={""}
        />);
        expect(cardContent.find(Typography)).toHaveLength(1);
    });

});
