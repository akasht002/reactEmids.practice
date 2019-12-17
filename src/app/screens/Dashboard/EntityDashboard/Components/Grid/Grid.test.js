import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon';
import { Grid } from './Grid'

Enzyme.configure({ adapter: new Adapter() })

let store;
const dispatch = sinon.spy();

const defaultState = {
    header: {
        className: 'Test'
    }
}

describe("Grid", function () {
    let wrapper;

    wrapper = shallow(
        <Grid dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the PointOfService Details body', () => {
        expect(wrapper).toBeDefined()
    });
});