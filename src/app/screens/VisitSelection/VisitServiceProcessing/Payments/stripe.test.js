import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { CheckoutForm, mapDispatchToProps, mapStateToProps } from './stripe';
jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../../redux/navigation/actions', () => ({
    push: jest.fn()
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    visitSelectionState: {
        VisitServiceProcessingState: {
            SummaryState: {},
            PerformTasksState: {
                SummaryDetails: {}
            }
        },
        VisitServiceDetailsState: {
            VisitServiceElibilityStatus: 'sadas'
        }
    },
    createCharge: jest.fn(),
    eligibilityCheck: {
        active: true,
        authorizationRequired: true
    }
}
store = mockStore(defaultState);

describe("CheckoutForm", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <CheckoutForm dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the CheckoutForm form body', () => {
        expect(shallowWrapper.find('[test-stripe="test-stripe"]').length).toEqual(1);
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).createCharge();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the chargeData function', () => {
        shallowWrapper.instance().chargeData()
        shallowWrapper.setProps({
            eligibilityCheck: {
                active: true,
                authorizationRequired: false
            }
        })
        shallowWrapper.instance().chargeData()
    });

});
