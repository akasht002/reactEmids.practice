import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import {VisitList} from './VisitList'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    visitHistoryList:[{
        serviceTypes:[{
            serviceTypeId:23
        }],
        billedTotalDuration :"xsfgsdfgsfgasdf",
        serviceRequestVisitNumber:324,
        patientId:23
    }],
    handelPatientProfile:jest.fn(),
    handleClicks:jest.fn()
}

describe("VisitList", function () {
    it('Check the VisitList Details body', () => {
        expect(VisitList(defaultState)).toBeDefined()
    });

    let data = {
        visitHistoryList:[],
        handelPatientProfile:jest.fn(),
        handleClicks:jest.fn()
    }

    it('Check the VisitList Details body', () => {
        expect(VisitList(data)).toBeDefined()
    });
});