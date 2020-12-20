import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import { BaseTitle } from "../RideControlCardTitle";

describe("<BaseTitle />", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BaseTitle text="My Amazing Title" />, div);
    });

    it('renders with the specified text', () => {
        const title = "My Amazing title";
        const wrapper = shallow(<BaseTitle text={title}/>);
        expect(wrapper.text()).toBe(title);
    });

    it('renders with the specified text', () => {
        const title = "My Amazing title";
        const wrapper = shallow(<BaseTitle text={title}/>);
        expect(wrapper.text()).toBe(title);
    });

});