import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { AssignServiceProvider, mapDispatchToProps, mapStateToProps } from './AssignServiceProvider';

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        entityId: 12
    })
}))

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 123
    })
}))

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    dashboardState: {
        dashboardState: {
            serviceProviderList: {
            }
        }
    },
    getEntityServiceProviderList: jest.fn(),
    setESP: jest.fn(),
    goToESPProfile: jest.fn(),
    getVisitServiceSchedule: jest.fn(),
    getEntityServiceProviderListSearch: jest.fn(),
    history: {
        push: jest.fn(),
        goBack: jest.fn()
    },
    serviceProviderList: [{
        id: 123,
        serviceProviderId: 34
    }],
    sp: {
        visitDate: '30-08-2019',
        entityServiceProviderId: 122
    },
    statusID: 38,
    onSubmit: jest.fn()
}

store = mockStore(defaultState);

describe("VisitSelection - AssignServiceProvider", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <AssignServiceProvider dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the AssignServiceProvider contains EntityUServiceProf', () => {
        shallowWrapper.setProps({
            serviceProviderList: [{
                id: 123,
                serviceProviderId: 34,
                thumbnail: true
            }]
        })
        expect(shallowWrapper.find('.EntityUServiceProf').length).toEqual(1);
    });

    it('Check the onchangeSearchServiceProvider', () => {
        let e = {
            target: {
                value: 'sdffsf'
            }
        }
        shallowWrapper.instance().onchangeSearchServiceProvider(e);
    });

    it('Check the handleserviceType', () => {
        let e = {
            target: {
                checked: true
            }
        }
        let item = {
            serviceProviderId: 121
        }
        shallowWrapper.instance().handleserviceType(item, e);
        e.target.checked = false
       shallowWrapper.instance().handleserviceType(item, e);
    });

    it('Check the togglePersonalDetails', () => {
        let e = {
            target: {
                value: 'asdfd'
            }
        }
        shallowWrapper.instance().togglePersonalDetails({}, e);
    });

    it('Check the onSubmit', () => {
        shallowWrapper.instance().onSubmit();
    });

    it('Check the goToESPProfile', () => {
        shallowWrapper.instance().goToESPProfile();
    });

    it('Check the isStatusInArray', () => {
        shallowWrapper.instance().isStatusInArray();
        shallowWrapper.instance().isStatusInArray(38);
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getEntityServiceProviderList();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setESP({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToESPProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceSchedule({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getEntityServiceProviderListSearch({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the events', () => {
        expect(shallowWrapper.find('[headerFooter="d-none"]').props().toggle());
        expect(shallowWrapper.find('[headerFooter="d-none"]').props().onCancel());
    });

    // it('Check for patient not defined', () => {
    //     shallowWrapper.setProps({
    //         patientDetails: {
    //             visitDate: '30-05-2019',
    //             serviceRequestVisitNumber: 'ssa12123d'
    //         }
    //     })
    //     expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    // });
});