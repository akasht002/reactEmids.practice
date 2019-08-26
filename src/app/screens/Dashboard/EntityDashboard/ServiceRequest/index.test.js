import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { ServiceRequest } from './index';

jest.mock('../StatCard', () => ({
    StatCard: 'mockStatCard'
}))

jest.mock('../../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        careTeamId: 12
    })
}))


Enzyme.configure({ adapter: new Adapter() })

let wrapper, store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    getServiceCategory: jest.fn(),
    getServiceRequestCountList: jest.fn(),
    getServiceRequestTableList: jest.fn(),
    getServiceRequestStatus: jest.fn(),
    getServiceType: jest.fn(),
    clearServiceTypes: jest.fn(),
    clearRequestStatus: jest.fn(),
    getScheduleType: jest.fn(),
    clearScheduleType: jest.fn(),
    getServiceRequestDetails: jest.fn(),
    getDiagnosisCode: jest.fn(),
    postDiagnosisCode: jest.fn(),
    impersinateIndividual: jest.fn(),
    getDiagnosisCodeText: jest.fn(),
    getServiceRequestId: jest.fn(),
    goToVisitServiceDetails: jest.fn(),
    setTab: jest.fn(),
    getStates: jest.fn(),
    setActiveSubTab: jest.fn(),
    visitServiceRequestTableList: [],
    serviceCategory: [],
    serviceType: [],
    serviceRequestStatusList: [],
    careteamDashboard: {
        VisitServiceRequestState: {
            visitServiceRequestCountList: [],
            visitServiceRequestTableList: [],
            serviceRequestStatusList: [],
            scheduleType: [],
            requestDetails: [],
            diagnosisCode: [],
            paginationCount: 0,
            activeSubTab: 1
        }
    },
    servicerequestState: {
        requirementsState: {
            requirementList: []
        }
    },
    spSearchState: {
        FilterState: {
            serviceType: []
        }
    }
};

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceRequest dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("ServiceRequest", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState
        wrapper = setUp(props)
        shallowWrapper = shallow(
            <ServiceRequest dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the ServiceRequest section', () => {
        expect(wrapper.find('.CTDashboardTabContent').length).toEqual(1);
    });

    it('Check the componentWillUnmount function', () => {
        // shallowWrapper.setProps({individualsList: []})
        // shallowWrapper.setState({phoneNumber: null})
        shallowWrapper.instance().componentWillUnmount()
    });

    it('Check the componentWillReceiveProps function', () => {
        const nextProps = {
            fromDate: '04/24/2019',
            toDate: '05/24/2019',
            visitServiceRequestTableList: [{
                dataCount: 32
            }]
        }
        shallowWrapper.setProps({
            fromDate: '03/24/2019',
            toDate: '04/24/2019'
        })
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
    });

    it('Check the getTable function', () => {
        const e = {
            target: {
                value: 'Open'
            }
        }
        shallowWrapper.setProps({
            visitServiceRequestCountList: [
                {
                    totalCount: 40,
                    statusName: 'Open'
                }
            ]
        })
        shallowWrapper.setState({
            pageSize: 50
        })
        shallowWrapper.instance().getTable(e)
        shallowWrapper.setState({
            pageSize: 30
        })
        shallowWrapper.instance().getTable(e)
    });

    it('Check the toggleFilter function', () => {
        shallowWrapper.instance().toggleFilter()
    });

    it('Check the componentDidUpdate function', () => {
        shallowWrapper.setProps({
            fromDate: '03/24/2019',
            toDate: '04/24/2019',
            visitServiceRequestTableList: [{
                dataCount: 32
            }]
        })
        shallowWrapper.instance().componentDidUpdate({}, {})
    });

    it('Check the applyFilter function', () => {
        shallowWrapper.instance().applyFilter()
    });

    it('Check the handleServiceRequestStatus function', () => {
        const item = {
            id: 12
        }
        const e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleServiceRequestStatus(item, e)
        e.target.checked = false
        shallowWrapper.instance().handleServiceRequestStatus(item, e)
    });

    it('Check the handleChangeServiceCategory function', () => {
        shallowWrapper.instance().handleChangeServiceCategory({})
    });

    it('Check the applyReset function', () => {
        shallowWrapper.instance().applyReset()
    });

    it('Check the pageNumberChange function', () => {
        shallowWrapper.setState({
            pageSize: 10,
            rowCount: 5
        })
        shallowWrapper.instance().pageNumberChange(1)
    });

    it('Check the handleserviceType function', () => {
        const item = {
            id: 12
        }
        const e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleserviceType(item, e)
        e.target.checked = false
        shallowWrapper.instance().handleserviceType(item, e)
    });

    it('Check the handleScheduleType function', () => {
        const item = {
            id: 12
        }
        const e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleScheduleType(item, e)
    });

    it('Check the toggleApproval function', () => {
        shallowWrapper.instance().toggleApproval()
    });

    it('Check the approvalToggle function', () => {
        const props = {
            serviceRequestId: 1
        }
        shallowWrapper.instance().approvalToggle(props)
    });

    it('Check the onClickAprrove function', () => {
        shallowWrapper.instance().onClickAprrove()
    });

    it('Check the toggleModalPopUp function', () => {
        shallowWrapper.instance().toggleModalPopUp()
    });

    it('Check the icdToggle function', () => {
        const data = {
            diagnosisCode: '23423523,4534534'
        }
        shallowWrapper.instance().icdToggle(data)
        data.diagnosisCode = ''
        shallowWrapper.instance().icdToggle(data)
        data.diagnosisCode = '21323423'
        shallowWrapper.instance().icdToggle(data)
    });

    it('Check the handleDiagnosisCode function', () => {
        const data = {
            diagnosisCode: '23423523, 21342342'
        }
        const e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.setState({
            selectedIcd: '7656756'
        })
        shallowWrapper.instance().handleDiagnosisCode(data, e)
        shallowWrapper.setState({
            selectedIcd: ''
        }) 
        shallowWrapper.instance().handleDiagnosisCode(data, e)
        shallowWrapper.setState({
            selectedIcd: '7656756'
        }) 
        e.target.checked = false
        shallowWrapper.instance().handleDiagnosisCode(data, e)
    });

    it('Check the onSubmit function', () => {
        shallowWrapper.instance().onSubmit()
    });

    it('Check the impersinateIndividual function', () => {
        const data = {
            serviceRequestId: 15
        }
        shallowWrapper.instance().impersinateIndividual(data)
    });

    it('Check the setTotalPage function', () => {
        const data = [{
            totalCount: 15
        }]
        shallowWrapper.instance().setTotalPage(data)
        const dataZero = []
        shallowWrapper.instance().setTotalPage(dataZero)
    });

    it('Check the onchangeIcdCodeSearch function', () => {
        const e = {
            target: {
                value: '133332'
            }
        }
        shallowWrapper.instance().onchangeIcdCodeSearch(e)
    });

    it('Check the handleStreet function', () => {
        const e = {
            target: {
                value: '133332'
            }
       }
        shallowWrapper.instance().handleStreet(e)
    });

    
    it('Check the handleCity function', () => {
        const e = {
            target: {
                value: '133332'
            }
       }
        shallowWrapper.instance().handleCity(e)
    });

    it('Check the handleState function', () => {
        shallowWrapper.instance().handleState({})
    });

    it('Check the onClickHandleIncr function', () => {
        shallowWrapper.setState({
            coverageArea: 20
        })
        shallowWrapper.instance().onClickHandleIncr()
        shallowWrapper.setState({
            coverageArea: 0
        })
        shallowWrapper.instance().onClickHandleIncr()
    });

    it('Check the onClickHandleDecr function', () => {
        shallowWrapper.setState({
            coverageArea: 20
        })
        shallowWrapper.instance().onClickHandleDecr()
        shallowWrapper.setState({
            coverageArea: 0
        })
        shallowWrapper.instance().onClickHandleDecr()
    });
    
    it('Check the handleChangeAuthorizationContent function', () => {
        const e = {
            target: {
                value: '456456'
            }
       }
        shallowWrapper.instance().handleChangeAuthorizationContent(e)
    });

    it('Check the handleAuthorizationtoggle function', () => {
        const data = {
            diagnosisCode: '1323123,2352352',
            serviceRequestId: 13123  
        }
        shallowWrapper.instance().handleAuthorizationtoggle(data, {})
        data.diagnosisCode = '34534346'
        shallowWrapper.instance().handleAuthorizationtoggle(data, {})
        data.diagnosisCode = ''
        shallowWrapper.instance().handleAuthorizationtoggle(data, {})
    });

    it('Check the handleAuthorization function', () => {
        shallowWrapper.instance().handleAuthorization({}, {})
    });

    
    it('Check the pageSizeChange function', () => {
        shallowWrapper.setState({
            rowCount: 5
        })
        shallowWrapper.instance().pageSizeChange(10)
    });

    it('Check the toggleSearch function', () => {
        shallowWrapper.instance().toggleSearch()
    });

    it('Check the handleSearchkeyword function', () => {
        const e = {
            target: {
                value: 'zsdasd'
            }
        }
        shallowWrapper.instance().handleSearchkeyword(e)
    });

    it('Check the closeSearch function', () => {
        shallowWrapper.instance().closeSearch()
    });

    it('Check the handleSearchkeywordPress function', () => {
        const event = {
            charCode: 13
        }
        shallowWrapper.instance().handleSearchkeywordPress(event)
        event.charCode = 0
        shallowWrapper.instance().handleSearchkeywordPress(event)
    });

    it('Check the onSortedChange function', () => {
        const value = [
            {
                desc: 'desc',
                id: 1
            },
            {
                asc: 'asc',
                id: 2
            }
        ]
        shallowWrapper.instance().onSortedChange(value)
    });

    it('Check the getServicesTypeId function', () => {
        shallowWrapper.instance().getServicesTypeId()
    });
})