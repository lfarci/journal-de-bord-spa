import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import { FormDialog } from "../../dialogs";
import { makeFormDialogProps } from '../helpers';
import { CircularProgress, DialogContent, DialogContentText } from '@material-ui/core';

describe("<FormDialog />", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        const props = makeFormDialogProps();
        ReactDOM.render(<FormDialog { ...props } />, div);
    });

    it('renders with the specified title when mounted', () => {
        const title = "My Amazing title";
        const props = makeFormDialogProps({ title: title });
        const wrapper = shallow(<FormDialog { ...props }/>);
        expect(wrapper.find(".form-dialog-title").text()).toBe(title);
    });

    it('does not render the dialog content when it isn\'t loading and has no error', () => {
        const props = makeFormDialogProps({ 
            error: undefined,
            loading: false,
            children: "Hello from my from dialog content!"
        });
        const wrapper = shallow(<FormDialog { ...props }/>);
        expect(wrapper.contains("DialogContent")).toBeFalsy();
    });

    it('renders the provided children when it is not loading and has no error', () => {
        const MyChild = (props: {name: string}) => <p>{ props.name }</p>;
        const props = makeFormDialogProps({ 
            error: undefined,
            loading: false,
            children: <MyChild name="Bob" /> 
        });
        const wrapper = shallow(<FormDialog { ...props }/>);
        expect(wrapper.find(MyChild)).toHaveLength(1);
    });

    it('renders the error message when it has an error and it is done loading', () => {
        const message = "That didn't work.";
        const props = makeFormDialogProps({ error: new Error(message), loading: false });
        const wrapper = shallow(<FormDialog { ...props }/>);
        const errorMessageElement = wrapper.find(DialogContentText);
        expect(errorMessageElement.text()).toBe(message);
    });

    it('doest not render as loading when it has an error and it is done loading', () => {
        const props = makeFormDialogProps({ error: new Error(), loading: false });
        const wrapper = shallow(<FormDialog { ...props }/>);
        expect(wrapper.find(".form-dialog-progress")).toHaveLength(0);
    });

    it('doest not render children when it has an error and it is done loading', () => {
        const MyChild = (props: {name: string}) => <p>{ props.name }</p>;
        const props = makeFormDialogProps({ 
            error: new Error(),
            loading: false,
            children: <MyChild name="Bob" /> 
        });
        const wrapper = shallow(<FormDialog { ...props }/>);
        expect(wrapper.find(MyChild)).toHaveLength(0);
    });

    it('renders as loading when it has an error but it is still loading', () => {
        const props = makeFormDialogProps({ 
            error: new Error(),
            loading: true
        });
        const wrapper = shallow(<FormDialog { ...props }/>);
        expect(wrapper.find(".form-dialog-progress")).toHaveLength(1);
    });

    it('does not render the error message when it has an error but it is still loading', () => {
        const message = "That didn't work.";
        const props = makeFormDialogProps({ error: new Error(message), loading: true });
        const wrapper = shallow(<FormDialog { ...props }/>);
        expect(wrapper.contains("DialogContentText")).toBeFalsy();
    });

    it('does not render the children when it has an error but it is still loading', () => {
        const MyChild = (props: {name: string}) => <p>{ props.name }</p>;
        const props = makeFormDialogProps({ 
            error: new Error(),
            loading: true,
            children: <MyChild name="Bob" /> 
        });
        const wrapper = shallow(<FormDialog { ...props }/>);
        expect(wrapper.find(MyChild)).toHaveLength(0);
    });

});