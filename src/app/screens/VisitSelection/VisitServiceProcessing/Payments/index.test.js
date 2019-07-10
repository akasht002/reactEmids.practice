import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { Payments } from './index.js';

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
    patientDetails: [],
    serviceRequestId: 1,
    patientId: 1,
    grandTotalAmount: 100,
    eligibilityCheck: {
        active: true,
        authorizationRequired: false
    },
    SummaryDetails: {
        patient:{
            patientId: 1
        }
    },
    summaryAmount: {
        CalculationsData: {
            copayAmount: 10,
            grandTotalAmount: 100
        },
        SummaryDetails: {
            serviceRequestId: 1,
            patient:{
                patientId: 1
            }
        }
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getpaymentsCardList: jest.fn(),
    chargeByCustomerId: jest.fn(),
    claimsSubmission: jest.fn(),
    captureAmount: jest.fn(),
    setPatient: jest.fn(),
    goToPatientProfile: jest.fn(),
    paymentCheck: jest.fn(),
    getVisitServiceHistoryByIdDetail: jest.fn(),
    isPaymentPathValid: jest.fn(),
    push: jest.fn(),
    history: {
        push: jest.fn()
    },
    ServiceRequestVisitId: 12,
    CardList: [{
        coreoHomeStripeCustomerId: 45,
        ccType: 'aadsa'
    }]
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Payments dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("Feedback", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <Payments dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the Payments form body', () => {
        expect(wrapper.find('.ProfileHeaderWidget').length).toEqual(1);
    });

     it('Check the toggle', () => {
        shallowWrapper.instance().toggle();
    });

     it('Check the toggleCardSelection', () => {
        shallowWrapper.instance().toggleCardSelection({ target: { value: 'TEST' } }, 1);
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });
    
    it('Check the componentWillReceiveProps', () => {
        let nextProps = {
            CardList: [{
                coreoHomeStripeCustomerId: 45
            }],
            paymentSuccessOrFailure: 'Payment Already Done'
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps);
        nextProps.CardList = [];
        nextProps.paymentSuccessOrFailure = 'sdfsd';
        shallowWrapper.instance().componentWillReceiveProps(nextProps);
    });

     it('Check the visitSummary', () => {
        shallowWrapper.instance().visitSummary(1);
    });

     it('Check the handleChange', () => {
        shallowWrapper.instance().handleChange({ target: { value: 'TEST' } }, 1);
    });

     it('Check the handelPatientProfile', () => {
        shallowWrapper.instance().handelPatientProfile(1);
    });

     it('Check the handleClick', () => {
        shallowWrapper.instance().handleClick();
    });

     it('Check the payByAuthorizedCardOption', () => {
        shallowWrapper.instance().payByAuthorizedCardOption();
    });

     it('Check the captureAmount', () => {
        shallowWrapper.instance().captureAmount();
    });

     it('Check the paymentsMethods', () => {
        shallowWrapper.instance().paymentsMethods();
    });

 }); 