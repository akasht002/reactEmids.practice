import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';

import { CoreoInformation } from './index'

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    coreoInformationDetails:{
        mpi:8,
        attributeProvider:99,
        cohorts:[{
            cohortName:'',
            acronym:"",
            riskIndicatorName:" "
        }],
        memberships:[{
            membershipName:'s'
        }],
        planName:''
    },
    profileState:{ 
        CoreoInformationState : {
            coreoInformationDetails:{
                mpi:8,
                attributeProvider:99
            }
        }
     },
    riskScore: {
        riskGroup: 'sdasd'
    }, 
     getPatientRiskScore: jest.fn(),
     getPatientCoreoDetails:jest.fn()
}

store = mockStore(defaultState);
describe("CoreoInformation", function () {
    let shallowWrapper;
    beforeEach(() => {
        shallowWrapper = shallow(
            <CoreoInformation dispatch={dispatch} store={store} {...defaultState} />
        )
    });
    it('Check the SPLanguages', () => {
        expect(shallowWrapper.find('col-md-12 card CardWidget SPLanguages').length).toEqual(0);
    });

    it('Check the renderDuplicateMpi function', () => {      
        shallowWrapper.instance().renderDuplicateMpi()
      });
  
});