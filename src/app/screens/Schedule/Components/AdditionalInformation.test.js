import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { AdditionalInformation } from './AdditionalInformation'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

Enzyme.configure({ adapter: new Adapter() })

const defaultState = {
    additionalDescription: "",
    handleAdditionInfo:jest.fn()
}

describe("AdditionalInformation", function () {
    it('Check the AdditionalInformation Details body', () => {
        expect(AdditionalInformation(defaultState)).toBeDefined()
    });
});