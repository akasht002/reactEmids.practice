import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { PaymentSuccess, mapDispatchToProps, mapStateToProps } from './index';

jest.mock('../../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    visitSelectionState: {
        VisitServiceProcessingState: {
            PerformTasksState: {
                PerformTasksList: [],
                startedTime: '123',
                SummaryDetails: {}
            },
            PaymentsState: {
                CardList: [],
                serviceRequestId: 1233
            }
        }
    },
    goVisitServiceList: jest.fn(),
    updateServiceRequestId: jest.fn(),
    setPatient: jest.fn(),
    goToPatientProfile: jest.fn(),
    goBack: jest.fn(),
    profileImgData: {
        image: 'asda/daasd/dasd'
    },
    patientDetails: {
        visitDate: '30-05-2019',
        serviceRequestVisitNumber: 'ssa12123d',
        patient: {
            patientId: 213123,
            imageString: 'asdasd/fsdfs',
            firstName: 'Akash',
            lastName : 'Tirole'
        }
    },
    history: {
        push: jest.fn(),
        goBack: jest.fn()
    },
    SummaryDetails: {
        originalTotalDuration: 12312,
        visitStartTime: 123
    }
}

store = mockStore(defaultState);

describe("VisitServiceProcessing - PaymentSuccess", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <PaymentSuccess dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the PaymentSuccess contains ProfileContentWidget', () => {
        shallowWrapper.setProps({
            patientDetails: {
                visitDate: '30-05-2019',
                serviceRequestVisitNumber: 'ssa12123d',
                patient: {
                    patientId: 213123,
                    firstName: 'Akash',
                    lastName : 'Tirole'
                }
            }
        })
        expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    });

    it('Check the componentWillUnmount', () => {
        shallowWrapper.instance().componentWillUnmount();
    });

    it('Check the toggle', () => {
        shallowWrapper.instance().toggle();
    });

    it('Check the toggleCardSelection', () => {
        let e = {
            target: {
                value: 'asdfd'
            }
        }
        shallowWrapper.instance().toggleCardSelection(e);
    });


    it('Check the handelPatientProfile', () => {
        shallowWrapper.instance().handelPatientProfile();
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).goVisitServiceList();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updateServiceRequestId({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setPatient({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToPatientProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goBack();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the events', () => {
        expect(shallowWrapper.find('.backProfileIcon').props().onClick());
        expect(shallowWrapper.find('.requestImageContent').props().onClick());
    });

    it('Check for patient not defined', () => {
        shallowWrapper.setProps({
            patientDetails: {
                visitDate: '30-05-2019',
                serviceRequestVisitNumber: 'ssa12123d'
            }
        })
        expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    });
});