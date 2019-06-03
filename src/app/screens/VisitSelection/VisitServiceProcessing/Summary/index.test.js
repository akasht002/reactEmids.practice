import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { Summary } from './index';

jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../../services/http', () => ({
    getUserInfo: () => ({
        isEntityServiceProvider: true
    })
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    VisitServiceElibilityStatus: {
        authorizationRequired: true,
        amount: 200,
        coInAuthorizationRequired: true,
        benefitPercent: 10,
        active: false
    },
    VisitServiceDetails: {
        statusId: 38
    },
    history: {
        push: jest.fn(),
        goBack: jest.fn()
    },
    saveAnswers: jest.fn(),
    goVisitServiceList: jest.fn(),
    SummaryDetails: {
        totalTaskCompleted: 20,
        totalTask: 40
    },
    patientDetails: {
        visitDate: '30-05-2019'
    },
    CalculationsData: {
        totalChargableTime: 1323
    }
}

store = mockStore(defaultState);

describe("VisitServiceProcessing - Summary", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Summary dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Summary contains ProfileContentWidget', () => {
        expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    });
});