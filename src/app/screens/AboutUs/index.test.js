import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { AboutUs } from './index'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    isOpen:true
}

describe("AboutUs", function () {
    let wrapper;

    wrapper = shallow(
        <AboutUs dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the Personal Details body', () => {
        wrapper.setState({
            selectedProfileType: 'Guardian'
        })
        expect(wrapper).toBeDefined()
    });
});