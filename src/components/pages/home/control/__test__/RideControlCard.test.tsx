import React from 'react';
import renderer from 'react-test-renderer';
import RideControlCard from "../RideControlCard";

it('renderes as expected', () => {
    const tree = renderer.create(<RideControlCard />).toJSON();
    expect(tree).toMatchSnapshot();
});