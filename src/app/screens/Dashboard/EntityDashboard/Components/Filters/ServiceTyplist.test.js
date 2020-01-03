import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import ServiceTypeList from './ServiceTyplist';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    handleServiceType: jest.fn(),
    serviceType: [{
        isChecked: true,
        serviceTypeDescription: 'ambulation'
    }]
};

store = mockStore(defaultState);

describe("ServiceTypeList", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <ServiceTypeList dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the ServiceRequestStatus contains form-group', () => {
        expect(shallowWrapper.find('.form-group').length).toEqual(1);
    });

    it('Check the events', () => {
        expect(shallowWrapper.find('.ServiceCheckbox').props().onChange({target:{checked: true}}))
    })
})