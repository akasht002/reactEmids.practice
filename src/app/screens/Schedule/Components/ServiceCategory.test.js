import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import ServiceCategory from './ServiceCategory'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    categoryList:[{
        serviceCategoryId:23,
        serviceCategoryDescription:''
    }],
    handleServiceCategory:jest.fn()
}

describe("ServiceCategory", function () {
    it('Check the ScheduleType Details body', () => {
        expect(ServiceCategory(defaultState)).toBeDefined()
    });
});