import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { AssignServiceProvider } from './AssignServiceProvider'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

Enzyme.configure({ adapter: new Adapter() })

const defaultState = {
    entityServiceProvidersList: [{
        thumbnail :'',
        serviceProviderId:'ser',
        firstName:'',
        lastName:'',
        selected :true
    }],
    handleAssignServiceProvider:jest.fn()
}

describe("AssignServiceProvider", function () {
    it('Check the AssignServiceProvider Details body', () => {
        expect(AssignServiceProvider(defaultState)).toBeDefined()
    });

    it('Check the AssignServiceProvider Details empty', () => {
        let data ={
            entityServiceProvidersList: [],
            handleAssignServiceProvider:jest.fn()
        }
        expect(AssignServiceProvider(data)).toBeDefined()
    });
});