import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { CheckBox } from './checkbox'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    participant: {
        userId:34,
        isChecked:true,
        thumbNail:''
    },
    onCheckParticipant:jest.fn()
}

describe("CheckBox", function () {
    let wrapper;

    wrapper = shallow(
        <CheckBox dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the CheckBox Details body', () => {
        wrapper.setState({
        })
        expect(wrapper).toBeDefined()
    });
});