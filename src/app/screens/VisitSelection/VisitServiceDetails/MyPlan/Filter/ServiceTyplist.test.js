import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon';
import ServiceTypeList from './ServiceTyplist'

Enzyme.configure({ adapter: new Adapter() })

let store;
const dispatch = sinon.spy();

const defaultState = {
    ServiceType: [{"serviceTypeId":14,"serviceTypeDescription":"Grocery Delivery","serviceTask":null,"taskCompleted":0,"totalTask":0}],
    handleserviceType: jest.fn()
}

describe("ServiceTypeList", function () {
    let wrapper;

    wrapper = shallow(
        <ServiceTypeList dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the Filter Details body', () => {
        expect(wrapper).toBeDefined()
    });

    it('should return ServiceCheckbox', () => {
        expect(wrapper.find('.ServiceCheckbox').props().onChange({ target: { checked: true } }))
    })

    // it('Check the Filter Details body', () => {
    //     wrapper.setProps({
    //         ServiceStatus: [{ "id": 46, "keyName": null, "keyValue": "All" }],
    //     })
    //     expect(wrapper.find('.ServiceCheckbox').props().onChange({ target: { checked: true } }))
    // });
});