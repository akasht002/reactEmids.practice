import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { Footer } from './Footer'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    percentageCompletion: 0,
    visitStatus:43,
    onClickNext:jest.fn()
}

describe("Footer", function () {
    let wrapper;

    wrapper = shallow(
        <Footer dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the Footer Details body', () => {
        wrapper.setState({
        })
        expect(wrapper).toBeDefined()
    });
});