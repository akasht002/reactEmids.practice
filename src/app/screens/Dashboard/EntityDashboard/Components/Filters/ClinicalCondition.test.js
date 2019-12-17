import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import ClinicalCondition  from './ClinicalCondition';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    handleClinicalConditions: jest.fn(),
    clinicalConditionList: [{
        attributeName: 'avsdc',
        isChecked: true
    }]
};

store = mockStore(defaultState);

describe("ClinicalCondition", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <ClinicalCondition dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the ClinicalCondition contains form-group', () => {
        expect(shallowWrapper.find('.form-group').length).toEqual(1);
    });

    it('Check the events', () => {
        expect(shallowWrapper.find('.ClinicalCheckBox').props().onChange({target:{checked: true}}))
    })
})