import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon';
import ServiceArea from './ServiceArea'

Enzyme.configure({ adapter: new Adapter() })

let store;
const dispatch = sinon.spy();

const defaultState = {
    ServiceAreaList: [{ "addressId": 531, "isChecked": true, "serviceProviderId": 156, "addressTypeId": 0, "streetAddress": " 141 Washington Ave Extension", "city": "Albany ", "stateId": 32, "stateName": "New York", "zipCode": 12205, "isActive": true, "rowversionId": "AAAAAACemfo=", "coverageArea": 0.0, "lat": 42.69531, "lon": -73.84612, "addressExternalId": 0 }],
    handleServiceArea: jest.fn()
}

describe("ServiceArea", function () {
    let wrapper;

    wrapper = shallow(
        <ServiceArea dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the Filter Details body', () => {
        expect(wrapper).toBeDefined()
    });

    it('should return form-radio-input', () => {
        expect(wrapper.find('.form-radio-input').props().onChange({ target: { checked: true } }))
    })
});