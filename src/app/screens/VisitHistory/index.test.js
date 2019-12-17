import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { VisitHistory, mapDispatchToProps, mapStateToProps } from './index';

Enzyme.configure({ adapter: new Adapter() })


jest.mock('../../utils/userUtility', () => ({
    getPatientData: () => ({
        patientId: 12
    })
}))

jest.mock('../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))


let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    VisitServiceHistory: [{}],
    VisitServiceDetails: [],
    serviceProviders: [],
    serviceCategories: [],
    serviceType: [],
    historyListCount: 100,
    PatientForServiceproviders: [],
    progressIndicatorState:3456,
    isLoading: false,
    serviceProviderId: 100,
    getVisitServiceLists: jest.fn(),
    getVisitServiceHistoryByIdDetail: jest.fn(),
    getAllServiceProviders: jest.fn(),
    getServiceCategory: jest.fn(),
    getVisitServiceListSort: jest.fn(),
    getServiceType: jest.fn(),
    clearServiceTypes: jest.fn(),
    clearServiceProviders: jest.fn(),
    getFilteredData: jest.fn(),
    getHistoryListCount: jest.fn(),
    getAllPatientForServiceProviders: jest.fn(),
    clearPatientForServiceProviders: jest.fn(),
    setPatient: jest.fn(),
    goToPatientProfile: jest.fn(),
    getServiceRequestId: jest.fn(),
    setServiceProviderFeedbackTab:jest.fn(),
    getPaymentAvailability:jest.fn(),
    saveScheduleType:jest.fn()
};

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <VisitHistory dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("Certification", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <VisitHistory dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the VisitHistory contains ProfileContentWidget', () => {
        expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    });

    it('Check the toggle', () => {
        shallowWrapper.setState({ filterOpen: false })
        shallowWrapper.instance().toggle();
    });

    it('Check the toggleFilter', () => {
        shallowWrapper.setState({ filterOpen: false })
        shallowWrapper.instance().toggleFilter();
    });

    it('Check the toggleHiddenScreen', () => {
        shallowWrapper.setState({ filterOpen: false, isOpen: false })
        shallowWrapper.instance().toggleHiddenScreen();
    });

    it('Check the handleClick', () => {
        shallowWrapper.instance().handleClick(1000);
    });

    it('Check the handleClick', () => {
        shallowWrapper.instance().handleClick({serviceRequestVisitId :0,visitTypeId :114});
    });

    it('Check the handleClick', () => {
        shallowWrapper.instance().handleClick({serviceRequestVisitId :23,visitTypeId :14});
    });

    it('Check the handleChangeServiceCategory ', () => {
        let selectedOption = [{ value: 1 }]
        shallowWrapper.setState({ serviceCategoryId: 12, selectedOption: [{ value: 1 }] })
        shallowWrapper.instance().handleChangeServiceCategory(selectedOption);
    });

    it('Check the handleserviceType', () => {
        shallowWrapper.instance().handleserviceType([], { target: { checked: true } });
        shallowWrapper.instance().handleserviceType([{ serviceTypeId: 10 }], { target: { checked: false } });
    });

    it('Check the handleChangeServiceCategory ', () => {
        let selectedOption = [{ value: 1 }]
        shallowWrapper.setState({ serviceCategoryId: 12, selectedOption: [{ value: 1 }] })
        shallowWrapper.instance().handleChangeServiceCategory(selectedOption);
    });

    it('Check the applyFilter true', () => {
        let selectedData = {
            searchData: {
                startDate: '1900-01-01',
                endDate: '1900-01-01',
                serviceProviderArray: [],
                individualList: []
            }
        }
        shallowWrapper.setState({ filterOpen: false, sort: false, activePage: 1 })
        shallowWrapper.instance().applyFilter(selectedData);
    });

    it('Check the applyFilter false', () => {
        let selectedData = {
            searchData: {
                startDate: '',
                endDate: '',
                serviceProviderArray: [],
                individualList: []
            }
        }
        shallowWrapper.setState({ filterOpen: false, sort: false, activePage: 1 })
        shallowWrapper.instance().applyFilter(selectedData);
    });

    it('Check the handlePageChange', () => {
        let pageNumber = 1;
        shallowWrapper.setState({ pageNumber: 1222, sort: false, activePage: 1 })
        shallowWrapper.instance().handlePageChange(pageNumber);
    });

    it('Check the handlePageChangeList', () => {
        let pageNumber = 1;
        shallowWrapper.setState({ pageNumber: 1222, sort: false, activePage: 1 })
        shallowWrapper.instance().handlePageChangeList(pageNumber);
    });

    it('Check the applyReset ', () => {
        shallowWrapper.instance().applyReset();
    });

    it('Check the selectedSort ', () => {
        let selectedKey = 1;
        shallowWrapper.instance().selectedSort(selectedKey);
    });

    it('Check the handelPatientProfile  ', () => {
        let data = 1;
        shallowWrapper.instance().handelPatientProfile(data);
    });

    it('Check the handleClick', () => {
        let data = {
            serviceRequestVisitId: 0
        }
        shallowWrapper.instance().handleClick(data);
    });


    it('Check maptoprops', () => {
        const initialState = {
            visitHistoryState:
            {
                vistServiceHistoryState: {
                    VisitServiceHistory: [{}],
                    VisitServiceDetails: [],
                    serviceProviders: [],
                    serviceCategories: [],
                    serviceType: [],
                    historyListCount: 100,
                    PatientForServiceproviders: [],
                    isLoading: false,
                }
            }
        }
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getVisitServiceLists();
        mapDispatchToProps(dispatch).getVisitServiceHistoryByIdDetail();
        mapDispatchToProps(dispatch).getAllServiceProviders();
        mapDispatchToProps(dispatch).getServiceCategory();
        mapDispatchToProps(dispatch).getVisitServiceListSort();
        mapDispatchToProps(dispatch).getServiceType();
        mapDispatchToProps(dispatch).clearServiceTypes();
        mapDispatchToProps(dispatch).clearServiceProviders();
        mapDispatchToProps(dispatch).getFilteredData();
        mapDispatchToProps(dispatch).getHistoryListCount();
        mapDispatchToProps(dispatch).getAllPatientForServiceProviders();
        mapDispatchToProps(dispatch).clearPatientForServiceProviders();
        mapDispatchToProps(dispatch).setPatient();
        mapDispatchToProps(dispatch).goToPatientProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearPatientForServiceProviders();
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).setPatient();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToPatientProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceRequestId();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveScheduleType();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAssessmentQuestionsList();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setServiceProviderFeedbackTab();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getPaymentAvailability();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

}); 