import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon';
import ServiceRequestsStatus from './Status'

Enzyme.configure({ adapter: new Adapter() })

let store;
const dispatch = sinon.spy();

const defaultState = {
    ServiceStatus: [{ "id": 43, "keyName": null, "keyValue": "Scheduled" }],
    handleAllServiceStatus: jest.fn(),
    handleChangeserviceStatus: jest.fn()
}

describe("ServiceRequestsStatus", function () {
    let wrapper;

    wrapper = shallow(
        <ServiceRequestsStatus dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the Filter Details body', () => {
        expect(wrapper).toBeDefined()
    });

    it('should return ServiceCheckbox', () => {
        expect(wrapper.find('.ServiceCheckbox').props().onChange({ target: { checked: true } }))
    })

    it('Check the Filter Details body', () => {
        wrapper.setProps({
            ServiceStatus: [{ "id": 46, "keyName": null, "keyValue": "All" }],
        })
        expect(wrapper.find('.ServiceCheckbox').props().onChange({ target: { checked: true } }))
    });

    it('Check the Filter Details body', () => {
        wrapper.setProps({
            ServiceStatus: [{ "id": 45, "keyName": null, "keyValue": "Completed" }, { "id": 46, "keyName": null, "keyValue": "NOT INTERESTED" }],
        })
        expect(wrapper).toBeDefined()
    });
});