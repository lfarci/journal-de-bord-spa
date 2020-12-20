import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import RideControlCardAction from "../RideControlCardAction";

describe("<RideControlCardAction />", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RideControlCardAction text="Action"/>, div);
    });

    it("shows the specified text", () => {
        const actionText = "Action";
        const action = shallow(<RideControlCardAction text={actionText}/>);
        expect(action.text()).toBe(actionText);
    });

    it("shows the default text when an empty string is specified", () => {
        const actionText = "Click";
        const action = shallow(<RideControlCardAction text=""/>);
        expect(action.text()).toBe(actionText);
    });

    it("has the specified color", () => {
        const color = "secondary";
        const action = shallow(<RideControlCardAction
            text="Action"
            color={color}
        />);
        expect(action.prop("color")).toBe(color);
    });

    it("has the primary color when nothing is specified", () => {
        const color = "primary";
        const action = shallow(<RideControlCardAction text="Action"/>);
        expect(action.prop("color")).toBe(color);
    });

    it("calls the onClick action when it is clicked", () => {
        const clickHandlerMock = jest.fn();
        const action = shallow(<RideControlCardAction
            text="Action"
            onClick={clickHandlerMock}
        />);
        action.simulate("click");
        expect(clickHandlerMock).toBeCalled();
    });

});
