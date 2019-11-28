import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon';
import ServiceCategory from './ServiceCategory'

Enzyme.configure({ adapter: new Adapter() })

let store;
const dispatch = sinon.spy();

const defaultState = {
    id: 10,
    searchable: false,
    placeholder: "Test",
    className: "Test",
    value: "Test",
    options: [{}]
}

describe("ServiceCategory", function () {
    let wrapper;

    wrapper = shallow(
        <ServiceCategory dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the Filter Details body', () => {
        expect(wrapper).toBeDefined()
    });

    // it('should return ServiceCheckbox', () => {
    //     expect(wrapper.find('.ServiceCheckbox').props().onChange({ target: { checked: true } }))
    // })

    // it('Check the Filter Details body', () => {
    //     wrapper.setProps({
    //         ServiceStatus: [{ "id": 46, "keyName": null, "keyValue": "All" }],
    //     })
    //     expect(wrapper.find('.ServiceCheckbox').props().onChange({ target: { checked: true } }))
    // });
});