import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import ServiceRequestStatus from './ServiceRequestStatus';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    handleServiceRequestStatus: jest.fn(),
    serviceRequestStatusList: [{
        id: 44,
        keyValue: 'In Progress'
    }]
};

store = mockStore(defaultState);

describe("ServiceRequestStatus", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <ServiceRequestStatus dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the ServiceRequestStatus contains form-group', () => {
        expect(shallowWrapper.find('.form-group').length).toEqual(1);
    });

    it('Check the events', () => {
        shallowWrapper.setProps({
            serviceRequestStatusList: [{
                keyValue: 41,
                id: 'open'
            }]
        })
        expect(shallowWrapper.find('.ServiceCheckbox').props().onChange({target:{checked: true}}))
    })
})