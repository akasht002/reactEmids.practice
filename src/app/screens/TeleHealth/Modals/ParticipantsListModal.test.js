import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { ParticipantsListModal } from './ParticipantListModal'


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

describe("ParticipantsListModal", function () {
    let wrapper;

    wrapper = shallow(
        <ParticipantsListModal dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the ParticipantsListModal Details body', () => {
        wrapper.setState({
        })
        expect(wrapper).toBeDefined()
    });
});