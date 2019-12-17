import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { Payments, mapDispatchToProps, mapStateToProps } from './index.js';

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
        patient: {
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
            patient: {
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
        ccType: 'visa'
    }],
    visitSelectionState: {
        VisitServiceProcessingState: {
            PerformTasksState: {
                PerformTasksList: [],
                startedTime: '',
                SummaryDetails: {},
                ServiceRequestVisitId: 1000
            },
            SummaryState: {

            },
            PaymentsState: {
                CardList: [],
                isLoading: true,
                errorMessage: 'Test'
            }
        },
        VisitServiceDetailsState: {
            VisitServiceElibilityStatus: []
        },
    }

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

    
    it('Check the payByAuthorizedCard ', () => {
        shallowWrapper.instance().payByAuthorizedCard ();
    });


    it('Check the componentDidMount', () => {
        shallowWrapper.setProps({
            ServiceRequestVisitId: null
        })
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the events', () => {
        shallowWrapper.instance().setState({
            SelectedCard: '1'
        })
        expect(shallowWrapper.find('[test-firstInput="test-firstInput"]').props().onClick());
        // expect(shallowWrapper.find('.requestImageContent').props().onClick());
        // expect(shallowWrapper.find('[test-feedback="test-feedback"]').props().onConfirm());
        // expect(shallowWrapper.find('[test-discard="test-discard"]').props().onConfirm());
        // expect(shallowWrapper.find('[test-feedback="test-feedback"]').props().onCancel());
        // expect(shallowWrapper.find('[test-discard="test-discard"]').props().onCancel());
        // expect(shallowWrapper.find('[test-input="test-input"]').props().onChange(e));
        // expect(enzymeWrapper.find('[name="newPass"]').props().onPaste(e));
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
        shallowWrapper.setProps({
            eligibilityCheck: {
                active: false,
                authorizationRequired: true
            }
        })
        shallowWrapper.instance().handleClick();
    });

    it('Check the handleClick', () => {
        shallowWrapper.setProps({
            eligibilityCheck: {
                active: true,
                authorizationRequired: false
            }
        })
        shallowWrapper.instance().handleClick();
    });

    it('Check the payByAuthorizedCardOption', () => {
        shallowWrapper.setProps({
            eligibilityCheck: {
                active: false,
                authorizationRequired: true
            }
        })
        shallowWrapper.instance().payByAuthorizedCardOption();
    });

    it('Check the payByAuthorizedCardOption', () => {
        shallowWrapper.setProps({
            eligibilityCheck: {
                active: true,
                authorizationRequired: false
            }
        })
        shallowWrapper.instance().payByAuthorizedCardOption();
    });

    it('Check the captureAmount', () => {
        shallowWrapper.instance().captureAmount();
    });

    it('Check the paymentsMethods', () => {
        shallowWrapper.instance().paymentsMethods();
    });


    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getpaymentsCardList(1);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).chargeByCustomerId(1, {});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).claimsSubmission({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).captureAmount(1, {});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setPatient(123);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).paymentCheck(null);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceHistoryByIdDetail(123);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).isPaymentPathValid(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });


    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

}); 