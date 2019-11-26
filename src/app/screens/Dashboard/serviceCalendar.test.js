import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { ServiceCalendar,mapDispatchToProps, mapStateToProps } from './serviceCalendar'

jest.mock('./ServiceInfo', () => ({
  ServiceCalendarList: () => ({
    userType: 'I'
  }),
  ShowIndicator: () => ({
    userType: 'I'
  })
}))

jest.mock('../../services/http', () => ({
  getUserInfo: () => ({
    isEntityServiceProvider: true
  })
}))

Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
  serviceVist: [
    {
      "planScheduleId": 438,
      "name": null,
      "categoryId": 1,
      "startDate": "8/30/2019 12:00:00 AM",
      "endDate": "8/31/2020 12:00:00 AM",
      "startTime": "16:30",
      "endTime": "17:30",
      "duration": null,
      "isRecurring": true,
      "description": null,
      "serviceProviderId": 0,
      "serviceTypes": [
        {
          "serviceTypeId": 2,
          "serviceTypeDescription": "Bathing",
          "planVisitTypeDetailsId": 0,
          "planServiceTypeDetailsId": 0,
          "serviceTask": null
        },
        {
          "serviceTypeId": 3,
          "serviceTypeDescription": "Continence",
          "planVisitTypeDetailsId": 0,
          "planServiceTypeDetailsId": 0,
          "serviceTask": null
        },
        {
          "serviceTypeId": 4,
          "serviceTypeDescription": "Eating",
          "planVisitTypeDetailsId": 0,
          "planServiceTypeDetailsId": 0,
          "serviceTask": null
        }
      ],
      "patientAddressId": 0,
      "patientId": 1083,
      "address": null,
      "schedulePattern": 19,
      "daily": null,
      "weekly": null,
      "monthly": null,
      "recurringDetails": null,
      "scheduleType": null,
      "scheduleTypeId": 115,
      "schedulePatternType": "Monthly"
    }
  ],
  userType: 0,
  authState: {
    userState: {
      userData: { userInfo: '2' },
      impersinated: '',

    }
  },
  dashboardState: {
    dashboardState: {
      isServiceVisitLoading: false,
      isServiceRequestLoading: false,
      isServiceProviderLoading: false,
      serviceVistCount: [{ visitDate: '2012-03-12' }],
      patientVisit: [],
      startDate: '2012-03-12',
      serviceVisitDate: '2012-03-12',
      serviceVist: []
    }
  },
  isStandByModeOn: {
    isServiceProviderInStandBy: false
  },
  serviceVistCount: [{
    visitDate: '2019-05-27'
  }],
  serviceProviderList: [],
  getServiceProviderVists: jest.fn(),
  getServiceVisitCount: jest.fn(),
  getEntityServiceProviderList: jest.fn(),
  getServiceRequestId: jest.fn(),
  setPatient: jest.fn(),
  goToPatientProfile: jest.fn(),
  createNewConversation: jest.fn(),
  createVideoConference: jest.fn(),
  goToServiceRequestDetailsPage: jest.fn(),
  setESP: jest.fn(),
  goToESPProfile: jest.fn(),
  getEntityServiceProviderListSearch: jest.fn(),
  setServiceVisitDate: jest.fn(),
  saveContextData: jest.fn(),
  formDirty: jest.fn(),
  formDirtyFeedback: jest.fn(),
  formDirtyPerformTask: jest.fn(),
  getPerformTasksList: jest.fn(),
  getServiceVisitId: jest.fn(),
  getSummaryDetails: jest.fn(),
  getSavedSignature: jest.fn(),
  getVisitServiceHistoryByIdDetail: jest.fn(),
  formDirtySummaryDetails: jest.fn(),
  setEntityServiceProvider: jest.fn(),
  createDataStore: jest.fn(),
  goToServiceVisitProcessing: jest.fn(),
  setActiveTab: jest.fn()
}

store = mockStore(defaultState)

describe('Dashboard - Service Calendar', function () {
  let shallowWrapper;
  beforeEach(() => {
    shallowWrapper = shallow(
      <ServiceCalendar dispatch={dispatch} store={store} {...defaultState} />
    )
  })

  it('Check serviceCalendar Component contains ProfileCardBody', () => {
    expect(shallowWrapper.find('.ProfileCardBody').length).toEqual(1)
  })

  it('should test initial state', () => {
    const initialState = defaultState
    expect(mapStateToProps(initialState)).toBeDefined();
}); 

it('Check mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getServiceProviderVists();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getServiceVisitCount();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getEntityServiceProviderList();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).updateEntityServiceVisit();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getServiceRequestId();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).setPatient();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).goToPatientProfile();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).createNewConversation();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).createVideoConference();
    expect(dispatch.mock.calls[0][0]).toBeDefined();        
    mapDispatchToProps(dispatch).goToServiceRequestDetailsPage();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).setEntityServiceProvider();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).setESP();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).goToESPProfile();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getEntityServiceProviderListSearch();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).setServiceVisitDate();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).saveContextData();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).goToServiceVisitProcessing();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
})

  it('Check the togglePersonalDetails function', () => {
    shallowWrapper.instance().togglePersonalDetails({},{})
  });

  it('Check the onSubmit function', () => {
    shallowWrapper.instance().data = {serviceRequestId:23}
    shallowWrapper.instance().onSubmit()
  });

  it('Check the componentDidMount function', () => {
    shallowWrapper.instance().componentDidMount()
  });

  it('Check the updateWindowDimensions function', () => {
    shallowWrapper.instance().updateWindowDimensions()
  });

  it('Check the componentWillUnmount function', () => {
    shallowWrapper.instance().componentWillUnmount()
  });

  it('Check the reset function', () => {
    shallowWrapper.instance().reset()
  });

  it('Check the handleserviceType function', () => {
    shallowWrapper.instance().handleserviceType({serviceProviderId :2343},{target:{checked:true}})
  });

  it('Check the onchangeSearchServiceProvider function', () => {
    shallowWrapper.instance().onchangeSearchServiceProvider({target:{value:true}})
  });


  it('Check the navigateProfileHeader function', () => {
    shallowWrapper.instance().navigateProfileHeader("conversationsummary")
  });


  it('Check the getYear function', () => {
    let selectMonth = '11'
    shallowWrapper.instance().getYear(selectMonth)
  });

  it('Check the MonthChange function', () => {
    let e = {
      value: '11'
    }
    shallowWrapper.instance().MonthChange(e)
  });

  it('Check the clickNextWeek function', () => {
    shallowWrapper.setState({
      width: '1290'
    })
    shallowWrapper.instance().clickNextWeek()
    shallowWrapper.setState({
      width: '1280'
    })
    shallowWrapper.instance().clickNextWeek()
  });

  it('Check the clickPrevWeek function', () => {
    shallowWrapper.setState({
      width: '1290'
    })
    shallowWrapper.instance().clickPrevWeek()
    shallowWrapper.setState({
      width: '1280'
    })
    shallowWrapper.instance().clickPrevWeek()
  });

  it('Check the todayDate function', () => {
    shallowWrapper.instance().todayDate()
  });

  it('Check the initialCall function', () => {
    
    shallowWrapper.instance().initialCall()
  });

  it('Check the handleDayChange function', () => {
    let e = {
      target: {
        getAttribute() { }
      }
    }
    shallowWrapper.instance().handleDayChange(e)
  });

  it('Check the clickShowMore function', () => {
    shallowWrapper.instance().clickShowMore()
  });

  it('Check the optionChanged function', () => {
    shallowWrapper.instance().optionChanged({})
  });

  it('Check the SelectOnBlur function', () => {
    shallowWrapper.instance().SelectOnBlur({})
  });

  it('Check the optionClicked function', () => {
    shallowWrapper.instance().optionClicked({})
  });

  it('Check the showServiceProviderList function', () => {
    let data = {
      target: {
        value: '27-05-2019'
      }
    }
    shallowWrapper.instance().showServiceProviderList(data)
  });

  it('Check the navigateProfileHeader function', () => {
    let link = {
      Conversation: 'Conversation',
      PhoneCall: 'Phone Call',
      default: 'default'
    }
    shallowWrapper.instance().navigateProfileHeader(link.Conversation)
    shallowWrapper.instance().navigateProfileHeader(link.PhoneCall)
    shallowWrapper.instance().navigateProfileHeader(link.default)
  });

  it('Check the onClickConversation function', () => {
    let item = {
      serviceProvider: {
        serviceProviderId: 1232
      }
    }
    shallowWrapper.instance().onClickConversation(item)
    shallowWrapper.instance().onClickConversation()
  });

  it('Check the onClickVideoConference function', () => {
    let item = {
      serviceProvider: {
        serviceProviderId: 1232
      }
    }
    shallowWrapper.instance().onClickVideoConference(item)
    shallowWrapper.instance().onClickVideoConference()
  });

  it('Check the goToServiceVisits function :=> SCHEDULED_VISIT_ID', () => {
    let data = {
      visitStatusId: 43,
      serviceRequestVisitId: 34,
      serviceRequestId: 34
    }
    shallowWrapper.instance().goToServiceVisits(data)
  });

  it('Check the goToServiceVisits function :=> IN_PROGRESS', () => {
    let data = {
      visitStatusId: 44,
      serviceRequestVisitId: 34,
      serviceRequestId: 34
    }
    shallowWrapper.instance().goToServiceVisits(data)
  });


  it('Check the goToServiceVisits function :=> PAYMENT_PENDING', () => {
    let data = {
      visitStatusId: 45,
      serviceRequestVisitId: 34,
      serviceRequestId: 34
    }
    shallowWrapper.instance().goToServiceVisits(data)
  });


  it('Check the goToServiceVisits function :=> VISIT_SUMMARY', () => {
    let data = {
      visitStatusId: 90,
      serviceRequestVisitId: 34,
      serviceRequestId: 34
    }
    shallowWrapper.instance().goToServiceVisits(data)
  });

  it('Check the goToServiceVisits function :=> default', () => {
    let data = {
      visitStatusId: 0,
      serviceRequestVisitId: 34,
      serviceRequestId: 34
    }
    shallowWrapper.instance().goToServiceVisits(data)
  });

  it('Check the handleClick function EU', () => {
    shallowWrapper.instance().handleClick(12123, 2, 'EU', 2)
  });

  it('Check the handleClick function SP', () => {
    shallowWrapper.instance().handleClick(111, 3, 'SP', 2)
  });


})