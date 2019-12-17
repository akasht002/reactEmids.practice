import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import ServiceTypes from './ServiceTypes'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    typeList:[{
        serviceTypeId:23,
        selected:false,
        serviceTypeName:''
    }],
    handleServiceType:jest.fn()
}

describe("ServiceTypes", function () {
    it('Check the ServiceTypes Details body', () => {
        expect(ServiceTypes(defaultState)).toBeDefined()
    });
});