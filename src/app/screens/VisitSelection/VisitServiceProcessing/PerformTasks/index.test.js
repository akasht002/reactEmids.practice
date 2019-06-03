import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { PerformTasks } from './index';

jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
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
    PerformTasksList: {
        visitStatus: 'sad',
        visitStartTime: 123,
        visitEndTime: 234,
        visitTimeDuration: 2434
    }
}

store = mockStore(defaultState);

describe("VisitServiceProcessing - PerformTasks", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <PerformTasks dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the PerformTasks contains ProfileContentWidget', () => {
        expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    });
});