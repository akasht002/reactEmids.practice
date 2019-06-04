import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { Details } from './Details';

Enzyme.configure({ adapter: new Adapter() })

const defaultState = {
    ServiceAreaList: [{
        addressId: 121,
        city: 'sadasd',
        zipCode: 23133,
        coverageArea: 20
    }],
    showModalOnDelete: jest.fn(),
    editServiceArea: jest.fn()
};

const setUp = (props = {}) => {
    const wrapper = mount(
        <Details {...props} />
    )
    return wrapper;
};

describe("Details", function () {
    let wrapper;

    beforeEach(() => {
        const props = defaultState
        wrapper = setUp(props)
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });
})